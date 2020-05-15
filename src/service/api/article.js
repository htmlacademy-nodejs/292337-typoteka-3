'use strict';

const {Router} = require(`express`);

const {HttpCode} = require(`../../constants`);
const itemValidator = require(`../middlewares/item-validator`);
const articleExist = require(`../middlewares/article-exist`);

const router = new Router();

const articleValidator = itemValidator([
  `title`,
  `announce`,
  `fullText`,
  `category`,
]);

module.exports = (parentRouter, articleDataService) => {
  parentRouter.use(`/articles`, router);

  router.get(`/`, (req, res) => {
    const articles = articleDataService.findAll();

    res
      .status(HttpCode.OK)
      .json(articles);
  });

  router.post(`/`, articleValidator, (req, res) => {
    const createdArticle = articleDataService.create(req.body);

    return res
      .status(HttpCode.CREATED)
      .json(createdArticle);
  });

  router.get(`/:articleId`, articleExist(articleDataService), (req, res) => {
    const {articleId} = req.params;
    const article = articleDataService.findOne(articleId);

    return res
      .status(HttpCode.OK)
      .json(article);
  });

  router.put(`/:articleId`, [articleValidator, articleExist(articleDataService)], (req, res) => {
    const {articleId} = req.params;
    const updatedArticle = articleDataService.update(articleId, req.body);

    return res
      .status(HttpCode.OK)
      .json(updatedArticle);
  });

  router.delete(`/:articleId`, articleExist(articleDataService), (req, res) => {
    const {articleId} = req.params;
    const deletedArticle = articleDataService.drop(articleId);

    return res
      .status(HttpCode.OK)
      .json(deletedArticle);
  });
};
