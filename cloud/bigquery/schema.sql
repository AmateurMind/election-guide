-- Create dataset (run in BigQuery console or via bq CLI)
-- bq mk --dataset election-495012:election_data

-- Voter turnout table
CREATE TABLE IF NOT EXISTS `election-495012.election_data.voter_turnout`
(
  year              INT64   NOT NULL,
  region            STRING  NOT NULL,
  registered_voters INT64   NOT NULL,
  votes_cast        INT64   NOT NULL,
  turnout_pct       FLOAT64 NOT NULL   -- 0–100
);
