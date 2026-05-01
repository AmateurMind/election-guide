/**
 * Global Express error handler.
 * Logs the error and sends a clean JSON response.
 */
function errorHandler(err, _req, res, _next) {
  console.error("[ERROR]", err.message);

  const status = err.status || err.statusCode || 500;
  const message =
    process.env.NODE_ENV === "production"
      ? "An internal error occurred."
      : err.message;

  res.status(status).json({ error: message });
}

module.exports = errorHandler;
