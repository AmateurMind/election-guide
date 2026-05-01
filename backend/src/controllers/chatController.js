const { chat } = require("../services/gemini");

/**
 * POST /api/chat
 * Body: { message: string }
 */
async function handleChat(req, res, next) {
  try {
    const { message } = req.body;
    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "message is required" });
    }
    const reply = await chat(message.trim());
    res.json({ reply });
  } catch (err) {
    next(err);
  }
}

module.exports = { handleChat };
