const { BigQuery } = require('@google-cloud/bigquery');

let client;

function getBigQuery() {
  if (!client) {
    client = new BigQuery({
      projectId: process.env.GCP_PROJECT_ID,
      keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    });
  }
  return client;
}

/**
 * Run a parameterized BigQuery query.
 * @param {string} query - SQL query string
 * @param {object[]} params - Query parameters array
 * @returns {Promise<object[]>} rows
 */
async function runQuery(query, params = []) {
  const bq = getBigQuery();
  const [rows] = await bq.query({ query, params, location: 'US' });
  return rows;
}

module.exports = { getBigQuery, runQuery };
