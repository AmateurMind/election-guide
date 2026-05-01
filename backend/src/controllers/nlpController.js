const { LanguageServiceClient } = require('@google-cloud/language');
const { runQuery } = require('../services/bigquery');

const DATASET = process.env.BIGQUERY_DATASET || 'election_data';

let nlpClient;
function getNlpClient() {
  if (!nlpClient) {
    nlpClient = new LanguageServiceClient({
      keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    });
  }
  return nlpClient;
}

/**
 * Map extracted entity/intent from the NL API to a BigQuery SQL query.
 * Extends with more patterns as needed.
 */
function mapToQuery(text, entities) {
  const lower = text.toLowerCase();

  if (lower.includes('highest turnout') || lower.includes('best region')) {
    return `
      SELECT region, ROUND(AVG(turnout_pct), 2) AS avg_turnout
      FROM \`${DATASET}.voter_turnout\`
      GROUP BY region
      ORDER BY avg_turnout DESC
      LIMIT 1
    `;
  }

  if (lower.includes('lowest turnout') || lower.includes('worst region')) {
    return `
      SELECT region, ROUND(AVG(turnout_pct), 2) AS avg_turnout
      FROM \`${DATASET}.voter_turnout\`
      GROUP BY region
      ORDER BY avg_turnout ASC
      LIMIT 1
    `;
  }

  if (lower.includes('trend') || lower.includes('over the years')) {
    return `
      SELECT year, ROUND(AVG(turnout_pct), 2) AS avg_turnout
      FROM \`${DATASET}.voter_turnout\`
      GROUP BY year
      ORDER BY year ASC
    `;
  }

  // Check if a specific region was mentioned
  const regionEntity = entities.find((e) => e.type === 'LOCATION');
  if (regionEntity) {
    return `
      SELECT year, region, turnout_pct
      FROM \`${DATASET}.voter_turnout\`
      WHERE LOWER(region) = LOWER('${regionEntity.name}')
      ORDER BY year ASC
    `;
  }

  return null;
}

/**
 * POST /api/nlp-query
 * Body: { query: string }
 */
async function handleNlpQuery(req, res, next) {
  try {
    const { query } = req.body;
    if (!query || typeof query !== 'string' || !query.trim()) {
      return res.status(400).json({ error: 'query is required' });
    }

    const client = getNlpClient();
    const [result] = await client.analyzeEntities({
      document: { content: query.trim(), type: 'PLAIN_TEXT' },
    });

    const entities = result.entities.map((e) => ({
      name: e.name,
      type: e.type,
      salience: e.salience,
    }));

    const sql = mapToQuery(query.trim(), entities);

    if (!sql) {
      return res.json({
        message: 'Query understood but no matching analytics pattern found.',
        entities,
        data: [],
      });
    }

    const data = await runQuery(sql);
    res.json({ entities, data });
  } catch (err) {
    next(err);
  }
}

module.exports = { handleNlpQuery };
