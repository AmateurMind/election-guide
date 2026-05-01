const { GoogleGenerativeAI } = require('@google/generative-ai');

let genAI;

function getGenerativeAI() {
  if (!genAI) {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not set in environment variables.');
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
  const ai = getGenerativeAI();
  const model = ai.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const systemPrompt = `You are ElectionGuide AI, an expert assistant that helps citizens
understand the election process, voting rights, how to register, key election dates, and
related civic topics. Answer clearly, factually, and in a friendly tone.
If the question is unrelated to elections or civics, politely redirect the user.`;

  const result = await model.generateContent([systemPrompt, userMessage]);
  return result.response.text();
}

module.exports = { chat };
