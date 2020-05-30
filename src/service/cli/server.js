'use strict';

const express = require(`express`);
const {getLogger} = require(`../lib/get-logger`);

const router = require(`../api`);
const {
  HttpCode,
} = require(`../../constants`);

const DEFAULT_PORT = 3000;
const API_PREFIX_PATH = `/api`;
const logger = getLogger();

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  logger.debug(`Start request to url ${req.url}`);

  // Light alternative to express-pino-logger
  res.set.on(`finish`, () => {
    logger.info(`End request with ${res.statusCode} to ${req.originalUrl}`);
  });

  next();
});
app.use(API_PREFIX_PATH, router);

app.use((req, res) => {
  res
    .status(HttpCode.NOT_FOUND)
    .send(`Not found`);

  logger.error(`End request with error ${res.statusCode} to url ${req.url}`);
});

app.use((err, req, res, next) => {
  logger.error(`Error: ${err}`);

  next();
});

const createServer = (port) => {
  app
    .listen(port, () => {
      logger.info(`Сервер стартовал на http://localhost:${port}`);
    })
    .on(`error`, (error) => {
      logger.error(`Server start failed with error: ${error}`);
    });
};

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    createServer(port);
  },
  app,
};
