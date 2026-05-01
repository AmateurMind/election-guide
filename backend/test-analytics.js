require("dotenv").config();
const { getAnalytics } = require("./src/controllers/analyticsController");

getAnalytics({}, { json: console.log }, (err) => console.error("NEXT ERR:", err))
  .then(() => process.exit(0))
  .catch(err => { console.error(err); process.exit(1); });
