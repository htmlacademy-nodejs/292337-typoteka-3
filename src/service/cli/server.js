'use strict';

const express = require(`express`);
const chalk = require(`chalk`);

const router = require(`../api`);
const {
  HttpCode,
} = require(`../../constants`);

const DEFAULT_PORT = 3000;
const API_PREFIX_PATH = `/api`;

const app = express();

app.use(express.json());
app.use(API_PREFIX_PATH, router);

app.use((req, res) => res
  .status(HttpCode.NOT_FOUND)
  .send(`Not found`)
);

const createServer = (port) => {
  app.listen(port, () => console.log(
      chalk.green(`Сервер стартовал на http://localhost:${port}`)
  ));
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
