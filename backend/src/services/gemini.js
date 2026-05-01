const { GoogleGenerativeAI } = require("@google/generative-ai");

let genAI;

function getGenerativeAI() {
  if (!genAI) {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not set in environment variables.");
    }
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }
  return genAI;
}

/**
 * Send a message to Gemini and return the text response.
 * @param {string} userMessage
 * @returns {Promise<string>}
 */
async function chat(userMessage) {
  try {
    const ai = getGenerativeAI();
    const preferredModel = process.env.GEMINI_MODEL || "gemini-1.5-flash";
    const fallbackModel = process.env.GEMINI_FALLBACK_MODEL || "gemini-1.5-pro";
    let model = ai.getGenerativeModel({ model: preferredModel });

    const systemPrompt = `You are ElectionGuide AI, an expert assistant that helps citizens
understand the election process, voting rights, how to register, key election dates, and
related civic topics. Answer clearly, factually, and in a friendly tone.
If the question is unrelated to elections or civics, politely redirect the user.`;

    let result;
    try {
      result = await model.generateContent([systemPrompt, userMessage]);
    } catch (err) {
      const modelNotFound =
        typeof err?.message === "string" &&
        (err.message.includes("is not found") || err.message.includes("404"));
      if (!modelNotFound || preferredModel === fallbackModel) {
        throw err;
      }
      console.warn(
        `[GEMINI MODEL FALLBACK] ${preferredModel} unavailable, retrying with ${fallbackModel}`
      );
      model = ai.getGenerativeModel({ model: fallbackModel });
      result = await model.generateContent([systemPrompt, userMessage]);
    }
    return result.response.text();
  } catch (err) {
    if (err.message.includes("429")) {
      console.error("[GEMINI 429 ERROR]", err);
      throw new Error("Gemini API quota exceeded. Please check your API key in .env and ensure it has available quota at aistudio.google.com.");
    }
    console.error("[GEMINI ERROR]", err);
    throw err;
  }
}

module.exports = { chat };
