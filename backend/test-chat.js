require("dotenv").config();
const { chat } = require("./src/services/gemini");

chat("Hello, how do I register to vote?")
  .then(reply => {
    console.log("REPLY:", reply);
    process.exit(0);
  })
  .catch(err => {
    console.error("ERROR:", err);
    process.exit(1);
  });
