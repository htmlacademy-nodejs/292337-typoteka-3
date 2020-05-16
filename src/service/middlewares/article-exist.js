'use strict';

const {HttpCode} = require(`../../constants`);

module.exports = (articleDataService) => (req, res, next) => {
  const {articleId} = req.params;
  const article = articleDataService.findOne(articleId);

  if (!article) {
    return res
      .status(HttpCode.NOT_FOUND)
      .send(`Can't found article with ${articleId}`);
  }

  res.locals.article = article;

  return next();
};

