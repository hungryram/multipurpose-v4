import { google } from 'googleapis';

export async function sentToSheet(value: any, spreadsheetId: string, sheetName: string) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.SHEETS_CLIENT_EMAIL,
        private_key: process.env.SHEETS_PRIVATE_KEY
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    const client = await auth.getClient();

    const googleSheets = google.sheets({
      version: 'v4', 
      auth: client
    });

    await googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: sheetName, //Name of the sheet
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          Object.values(value)
        ]
      }
    })

  } catch (err) {
    console.log(err);
  }
  return [];
}