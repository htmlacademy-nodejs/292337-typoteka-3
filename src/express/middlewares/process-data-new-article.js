'use strict';

module.exports = (req, res, next) => {
  try {
    console.log(req.files.titleImage);
  } catch (error) {
    return false;
  }

  res.locals.data = {
    ...req.fields,
    ...req.files,
  };

  return next();
};
