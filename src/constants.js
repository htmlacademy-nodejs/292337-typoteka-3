'use strict';

const DEFAULT_COUNT = 1;
const MAX_COUNTS = 1000;
const DEFAULT_COMMAND = `--help`;
const USER_ARGV_INDEX = 2;
const ExitCode = {
  success: 0,
  error: 1
};

module.exports = {
  DEFAULT_COUNT,
  MAX_COUNTS,
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  ExitCode,
};
