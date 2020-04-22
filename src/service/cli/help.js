'use strict';

const HELP_MESSAGE =
  `Программа запускает http-сервер и формирует файл с данными для API.

  Гайд:
  server <command>

  Команды:
  --version:            выводит номер версии
  --help:               печатает этот текст
  --generate <count>    формирует файл mocks.json`;

console.info(HELP_MESSAGE);

module.exports = {
  name: `--help`,
  run() {
    console.info(HELP_MESSAGE);
  }
};