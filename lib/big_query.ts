// test-bigquery.ts
import { BigQuery } from "@google-cloud/bigquery"

async function testInsert() {
  const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON || "{}")

  const bigquery = new BigQuery({
    projectId: "gcfa-upstart13",
    credentials,
  })

  const datasetId = "gladney_analytics"
  const tableId = "user_tracking"

  const rows = [
    {
      event_id: "test-123",
      timestamp: new Date().toISOString(),
      email: "teste@app.com",
      route: "/debug",
      extra_action: "manual_insert",
      ip: "127.0.0.1",
      user_agent: "node-test",
      session_id: "sess-xyz",
      time_since_last_action: 0,
    },
  ]

  await bigquery.dataset(datasetId).table(tableId).insert(rows)
  console.log("✅ Row inserted!")
}

testInsert().catch(console.error)
