-- BigQuery ML: Voter Turnout Prediction Model
-- Run this in the BigQuery console after seeding the voter_turnout table.

CREATE OR REPLACE MODEL `election-495012.election_data.voter_turnout_model`
OPTIONS(
  model_type = 'linear_reg',
  input_label_cols = ['turnout_pct'],
  data_split_method = 'AUTO_SPLIT'
) AS
SELECT
  year,
  region,
  registered_voters,
  turnout_pct
FROM
  `election-495012.election_data.voter_turnout`;

-- After training, predict turnout for a future year:
-- SELECT * FROM ML.PREDICT(MODEL `election-495012.election_data.voter_turnout_model`,
--   (SELECT 2028 AS year, 'North' AS region, 1650000 AS registered_voters));
