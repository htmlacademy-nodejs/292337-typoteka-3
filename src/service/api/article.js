'use strict';

const {Router} = require(`express`);

const {HttpCode} = require(`../../constants`);
const itemValidator = require(`../middlewares/item-validator`);
const articleExist = require(`../middlewares/article-exist`);
const commentExist = require(`../middlewares/comment-exist`);

const articleValidator = itemValidator([
  `title`,
  `announce`,
  `fullText`,
  `category`,
]);
const commentValidator = itemValidator([`text`]);

const router = new Router();

module.exports = (parentRouter, articleDataService, commentDataService) => {
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
    const {article} = res.locals;

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

  router.get(`/:articleId/comments`, articleExist(articleDataService), (req, res) => {
    const comments = commentDataService.findAll(res.locals.article);

    res
      .status(HttpCode.OK)
      .json(comments);
  });

  router.post(`/:articleId/comments`, [commentValidator, articleExist(articleDataService)], (req, res) => {
    const {article} = res.locals;
    const createdComment = commentDataService.create(req.body, article);

    return res
      .status(HttpCode.CREATED)
      .json(createdComment);
  });

  router.get(`/:articleId/comments/:commentId`, [articleExist(articleDataService), commentExist(commentDataService)], (req, res) => {
    const {comment} = res.locals;

    return res
      .status(HttpCode.OK)
      .json(comment);
  });

  router.delete(`/:articleId/comments/:commentId`, [articleExist(articleDataService), commentExist(commentDataService)], (req, res) => {
    const {commentId} = req.params;
    const {article} = res.locals;
    const deletedComment = commentDataService.drop(commentId, article);

    return res
      .status(HttpCode.OK)
      .json(deletedComment);
  });
};
