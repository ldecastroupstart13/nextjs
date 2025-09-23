import { google } from "googleapis"

export async function getGoogleSheetsClient() {
  const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON!)

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  })

  return google.sheets({ version: "v4", auth })
}

export async function logToGoogleSheets(data: {
  timestamp: string
  email: string
  route: string
  extraAction?: string
  ip: string
  userAgent: string
  sessionId: string
  timeSinceLastAction?: number
}) {
  try {
    const sheets = await getGoogleSheetsClient()
    const SPREADSHEET_ID = "1PtGM-CLkru5jWytYZfDW9ay-tFDJhHiIWSBGjL32Vbk"

    // Check if headers exist
    const headerResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "A1:H1",
    })

    if (!headerResponse.data.values || headerResponse.data.values.length === 0) {
      // Add headers
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: "A1:H1",
        valueInputOption: "RAW",
        requestBody: {
          values: [
            [
              "Timestamp",
              "Email",
              "Rota",
              "Extra Action",
              "IP",
              "User-Agent",
              "Session ID",
              "Time Since Last Action (s)",
            ],
          ],
        },
      })
    }

    // Add data
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "A:H",
      valueInputOption: "RAW",
      requestBody: {
        values: [
          [
            data.timestamp,
            data.email,
            data.route,
            data.extraAction || "",
            data.ip,
            data.userAgent,
            data.sessionId,
            data.timeSinceLastAction || "",
          ],
        ],
      },
    })
  } catch (error) {
    console.error("Error logging to Google Sheets:", error)
  }
}
