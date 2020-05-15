'use strict';

const fs = require(`fs`).promises;
const express = require(`express`);
const chalk = require(`chalk`);

const router = require(`../api`);
const {
  HttpCode,
} = require(`../../constants`);

const DEFAULT_PORT = 3000;
const FILENAME = `mock.json`;
const API_PREFIX_PATH = `/api`;

const app = express();

app.use(express.json());
app.use(API_PREFIX_PATH, router);

app.get(`/posts`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(FILENAME);
    const mocks = fileContent.length > 0
      ? JSON.parse(fileContent)
      : [];

    res.json(mocks);
  } catch (error) {
    if (error.code === `ENOENT`) {
      res.json([]);
    } else {
      res
        .status(HttpCode.INTERNAL_SERVER_ERROR)
        .send(error);
    }
  }
});

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
};
