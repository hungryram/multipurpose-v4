"use server"

import {ServerClient} from "postmark"
import {redirect} from "next/navigation"
import {sentToSheet} from "../../../../../lib/sheetsapi"

export const submitForm = async (
  data,
  spreadsheetId,
  sheetName,
  subject,
  sendTo,
  redirectTo
) => {
  let formData = {}
  let email = ""

  // ✅ Stronger spam filters
  const honeypot = data.get("website") || "" // visible honeypot field
  const formStartTime = data.get("formStartTime")

  // ✅ 1. Honeypot check
  if (honeypot.trim().length > 0) {
    console.log("Spam detected: honeypot filled")
    return
  }

  // ✅ 2. Timing check (submitted too quickly)
  // if (formStartTime) {
  //   const diff = Date.now() - Number(formStartTime)
  //   if (diff < 3000) {
  //     console.log("Spam detected: submitted too quickly")
  //     return
  //   }
  // }

  // ✅ Extract all other form fields
  data.forEach((value, name) => {
    if (
      !name.includes("$ACTION_ID") &&
      name !== "bcc" &&
      name !== "cc" &&
      name !== "website" &&
      name !== "formStartTime" &&
      name !== "antiSpamAnswer" &&
      name !== "sendTo" &&
      name !== "sendFrom" &&
      name !== "subject" &&
      name !== "redirectTo" &&
      name !== "fullPath"
    ) {
      if (name === "Email") {
        email = value
      }

      if (formData[name]) {
        formData[name] = Array.isArray(formData[name])
          ? [...formData[name], value]
          : [formData[name], value]
      } else {
        formData[name] = value
      }
    }
  })

  // ✅ Send to Google Sheets if needed
  if (sheetName && spreadsheetId) {
    await sentToSheet(formData, spreadsheetId, sheetName)
  }

  // ✅ Prepare Postmark HTML body
  const tableRows = Object.entries(formData).map(([key, value]) => {
    if (Array.isArray(value)) {
      return `
        <tr>
          <td><strong>${key}</strong></td>
          <td>${value.join(", ")}</td>
        </tr>
      `
    } else {
      return `
        <tr>
          <td><strong>${key}</strong></td>
          <td>${value}</td>
        </tr>
      `
    }
  })

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
      <h2 style="color: #2C3E50; text-align: center;">📩 Form Submission</h2>
      <hr style="border: none; border-top: 2px solid #ddd; margin: 10px 0;">
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <tbody>
          ${tableRows.join("")}
        </tbody>
      </table>
      <p style="text-align: center; font-size: 14px; color: #777; margin-top: 20px;">
        <em>This email was automatically generated from a form submission on ${data.get("fullPath")}</em>
      </p>
    </div>
  `

  if (process.env.POSTMARK_API_TOKEN) {
    const client = new ServerClient(process.env.POSTMARK_API_TOKEN)

    let response // ✅ Declare outside

    try {
      response = await client.sendEmail({
        From: `"Website Form Submission": <forms@hungryramwebdesign.com>`,
        To: sendTo,
        ReplyTo: email,
        Subject: subject,
        HtmlBody: htmlBody,
      })
    } catch (err) {
      console.error("Postmark send error:", err)
    }

    if (response?.Message === "OK") {
      const safeRedirect = redirectTo?.startsWith("/")
        ? redirectTo
        : `/${redirectTo || "thank-you"}`
      redirect(safeRedirect)
    }
  } else {
    console.error("Postmark API token is missing.")
  }
}
