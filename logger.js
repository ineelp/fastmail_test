const pino = require("pino");

const logger = pino({
  name: process.env.APP_ID,
  level: process.env.LOG_LEVEL || "info", // Default to 'info' if LOG_LEVEL is not set
});

module.exports = logger;
