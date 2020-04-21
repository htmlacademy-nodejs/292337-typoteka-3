'use strict';

const packageJson = require("../../../package.json");

module.exports = {
  name: `--version`,
  run() {
    const version = packageJson.version;

    console.log(version);
  },
};
