const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const chatRoutes = require("./routes/chat");
const timelineRoutes = require("./routes/timeline");
const guideRoutes = require("./routes/guide");
const analyticsRoutes = require("./routes/analytics");
const nlpRoutes = require("./routes/nlp");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Security & logging middleware
app.use(helmet());
app.use(morgan("dev"));
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:3000" }));
app.use(express.json({ limit: "10kb" }));

// Rate limiting
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use("/api", limiter);

// Routes
app.use("/api/chat", chatRoutes);
app.use("/api/timeline", timelineRoutes);
app.use("/api/guide", guideRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/nlp-query", nlpRoutes);

// Health check
app.get("/health", (_req, res) => res.json({ status: "ok" }));

// 404
app.use((_req, res) => res.status(404).json({ error: "Not found" }));

// Global error handler
app.use(errorHandler);

module.exports = app;
