const { runQuery } = require("../services/bigquery");

const DATASET = process.env.BIGQUERY_DATASET || "election_data";

/**
 * GET /api/analytics
 * Returns voter turnout trends and region-wise participation.
 */
async function getAnalytics(req, res, next) {
  try {
    const [turnoutTrends, regionData] = await Promise.all([
      // Year-over-year turnout
      runQuery(`
        SELECT year, ROUND(AVG(turnout_pct), 2) AS avg_turnout
        FROM \`${DATASET}.voter_turnout\`
        GROUP BY year
        ORDER BY year ASC
        LIMIT 20
      `),
      // Region-wise participation
      runQuery(`
        SELECT region, ROUND(AVG(turnout_pct), 2) AS avg_turnout,
               SUM(registered_voters) AS total_registered
        FROM \`${DATASET}.voter_turnout\`
        GROUP BY region
        ORDER BY avg_turnout DESC
        LIMIT 15
      `),
    ]);

    res.json({ turnoutTrends, regionData });
  } catch (err) {
    next(err);
  }
}

module.exports = { getAnalytics };
