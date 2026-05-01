const { VertexAI } = require("@google-cloud/vertexai");
const path = require("path");

let vertexAI;

function getVertexAI() {
  if (!vertexAI) {
    // VertexAI automatically uses GOOGLE_APPLICATION_CREDENTIALS if set
    vertexAI = new VertexAI({
      project: process.env.GCP_PROJECT_ID,
      location: "us-central1", // Use a stable region
    });
  }
  return vertexAI;
}

/**
 * Send a message to Gemini via Vertex AI and return the text response.
 * @param {string} userMessage
 * @returns {Promise<string>}
 */
async function chat(userMessage) {
  const vertex = getVertexAI();
  const model = vertex.getGenerativeModel({
    model: "gemini-1.5-flash-001",
  });

  const systemPrompt = {
    text: `You are ElectionGuide AI, an expert assistant that helps citizens
understand the election process, voting rights, how to register, key election dates, and
related civic topics. Answer clearly, factually, and in a friendly tone.
If the question is unrelated to elections or civics, politely redirect the user.`,
  };

  const userPrompt = { text: userMessage };

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [systemPrompt, userPrompt] }],
  });

  const response = await result.response;
  return response.candidates[0].content.parts[0].text;
}

module.exports = { chat };
