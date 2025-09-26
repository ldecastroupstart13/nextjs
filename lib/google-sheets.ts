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
  id: string            // 👈 Event ID (único por clique)
  timestamp: string
  email: string
  route: string
  extraAction?: string
  ip: string
  userAgent: string
  sessionId: string     // 👈 Pode continuar existindo (sessão auth)
  timeSinceLastAction?: number
}) {
  try {
    const sheets = await getGoogleSheetsClient()
    const SPREADSHEET_ID = "1PtGM-CLkru5jWytYZfDW9ay-tFDJhHiIWSBGjL32Vbk"

    // Verifica headers
    const headerResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "A1:I1",
    })

    if (!headerResponse.data.values || headerResponse.data.values.length === 0) {
      // Cria headers incluindo o Event ID
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: "A1:I1",
        valueInputOption: "RAW",
        requestBody: {
          values: [
            [
              "Event ID",
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

    // Append da linha
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "A:I",
      valueInputOption: "RAW",
      requestBody: {
        values: [
          [
            data.id, // 👈 sempre único
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
