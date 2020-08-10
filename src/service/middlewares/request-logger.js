'use strict';

module.exports = (logger) => (req, res, next) => {
  logger.debug(`Start request to url ${req.url}`);

  // Light alternative to express-pino-logger
  res.on(`finish`, () => {
    logger.info(`End request with ${res.statusCode} to ${req.originalUrl}`);
  });

  next();
};
