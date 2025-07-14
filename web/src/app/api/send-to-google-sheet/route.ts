import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { value, spreadsheetId, sheetName } = body;

    if (!value || !spreadsheetId || !sheetName) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.SHEETS_CLIENT_EMAIL,
        private_key: process.env.SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: 'v4', auth: client });

    await googleSheets.spreadsheets.values.append({
      spreadsheetId,
      range: sheetName,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [Object.values(value)] },
    });

    return NextResponse.json({ message: 'Success' });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: 'Error', error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}

// If you want to handle GET or other methods:
export const GET = () =>
  NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
