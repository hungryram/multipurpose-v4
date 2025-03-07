'use server'
import { ServerClient } from 'postmark'
import { redirect } from 'next/navigation';
import {sentToSheet} from '../../../../../lib/sheetsapi'

export const submitForm = async (data, spreadsheetId, sheetName) => {

    let formData = {}
    let email = '';
    const honeypot = data.get('name-honey')

    data.forEach((value, name) => {
        if (
            !name.includes('$ACTION_ID') &&
            name !== 'bcc' &&
            name !== 'cc' &&
            name !== 'name-honey' &&
            name !== 'sendTo' &&
            name !== 'sendFrom' &&
            name !== 'subject' &&
            name !== 'redirectTo'
        ) {
            if (name === 'Email') {
                email = value;
            }

            if (formData[name]) {
                formData[name] = Array.isArray(formData[name])
                    ? [...formData[name], value]
                    : [formData[name], value];
            } else {
                formData[name] = value;
            }
        }
    });

    // For Google Sheets
    if(sheetName && spreadsheetId) {
        await sentToSheet(formData, spreadsheetId, sheetName)
    }

    // For Postmark
    const tableRows = Object.entries(formData).map(([key, value]) => {
        if (Array.isArray(value)) {
            return `
        <tr>
          <td><strong>${key}</strong></td>
          <td>${value.join(', ')}</td>
        </tr>
      `;
        } else {
            return `
        <tr>
          <td><strong>${key}</strong></td>
          <td>${value}</td>
        </tr>
      `;
        }
    });

    const htmlBody = `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: #2C3E50; text-align: center;">📩 Contact Form Submission</h2>
        <hr style="border: none; border-top: 2px solid #ddd; margin: 10px 0;">
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tbody>
                ${tableRows.join('')}
            </tbody>
        </table>

        <p style="text-align: center; font-size: 14px; color: #777; margin-top: 20px;">
            <em>This email was automatically generated from a form submission.</em>
        </p>
    </div>
  `;

    if (honeypot.length === 0) {
        if (process.env.POSTMARK_API_TOKEN) {
            const client = new ServerClient(process.env.POSTMARK_API_TOKEN);

            const response = await client.sendEmail({
                "From": data.get('sendFrom'), // must match sender signature on postmark account
                "To": data.get('sendTo'),
                "Bcc": data.get('bcc'),
                "Cc": data.get('cc'),
                "ReplyTo": email,
                "Subject": data.get('subject'),
                "HtmlBody": htmlBody,
            })
                .then((res) => res)
                .catch((err) => console.error(err))

            if (response?.Message === 'OK') {
                return redirect(`/${data.get('redirectTo')}`)
            }
        } else {
            console.error("Postmark API token is missing.");
        }
    }
}