require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function listModels() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const result = await genAI.listModels();
  for (const model of result.models) {
    console.log(model.name, model.supportedGenerationMethods);
  }
}

listModels().catch(console.error);
