'use strict';

const {Router} = require(`express`);

const {HttpCode} = require(`../../constants`);

const router = new Router();

module.exports = (parentRouter, articleDataService) => {
  parentRouter.use(`/articles`, router);

  router.get(`/`, (req, res) => {
    const articles = articleDataService.getAll();

    res
      .status(HttpCode.OK)
      .json(articles);
  });

  router.post(`/`, (req, res) => {
    const createdArticle = articleDataService.create(req.body);

    return res
      .status(HttpCode.CREATED)
      .json(createdArticle);
  });

  router.get(`/:articleId`, (req, res) => {
    const {articleId} = req.params;
    const article = articleDataService.findOne(articleId);

    return res
      .status(HttpCode.OK)
      .json(article);
  });

  router.put(`/:articleId`, (req, res) => {
    const {articleId} = req.params;
    const updatedArticle = articleDataService.update(articleId, req.body);

    return res
      .status(HttpCode.OK)
      .json(updatedArticle);
  });

  router.delete(`/:articleId`, (req, res) => {
    const {articleId} = req.params;
    const deletedArticle = articleDataService.drop(articleId);

    return res
      .status(HttpCode.OK)
      .json(deletedArticle);
  });
};
