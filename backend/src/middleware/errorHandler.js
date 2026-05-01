/**
 * Global Express error handler.
 * Logs the error and sends a clean JSON response.
 */
function errorHandler(err, _req, res, _next) {
  console.error('[ERROR]', err.message);

  let status = 500;
  let message = 'Internal server error';

  if (err.message.includes('BigQuery')) {
    status = 503;
    message = 'Data service unavailable';
  } else if (err.message.includes('NLP')) {
    status = 503;
    message = 'AI service unavailable';
  }

  res.status(status).json({ error: message });
}


module.exports = errorHandler;
