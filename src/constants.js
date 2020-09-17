'use strict';

const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const DEFAULT_COMMAND = `--help`;
const USER_ARGV_INDEX = 2;
const ExitCode = {
  success: 0,
  error: 1
};
const HttpCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};
const MAX_ID_LENGTH = 6;

const MOCK_FILENAME = `mock.json`;

const MAX_FILENAME_LENGTH = 6;
const ALLOWED_FILETYPES = [
  `image/jpeg`,
  `image/png`,
];

module.exports = {
  DEFAULT_COUNT,
  MAX_COUNT,
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  ExitCode,
  HttpCode,
  MAX_ID_LENGTH,
  MOCK_FILENAME,
  MAX_FILENAME_LENGTH,
  ALLOWED_FILETYPES,
};
