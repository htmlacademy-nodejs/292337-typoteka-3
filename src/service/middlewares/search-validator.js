'use strict';

const {HttpCode} = require(`../../constants`);

module.exports = (requiredKeys) => (req, res, next) => {
  try {
    const keysInData = Object.keys(req.query);
    const isDataValid = requiredKeys.every((key) => keysInData.includes(key));

    if (!isDataValid) {
      return res
        .status(HttpCode.BAD_REQUEST)
        .send(`Bad request`);
    }
  } catch (error) {
    console.error(error);
  }

  return next();
};
