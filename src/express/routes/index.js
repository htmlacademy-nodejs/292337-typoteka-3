'use strict';

const {Router} = require(`express`);

const {
  ArticleDataService,
  // CommentsDataService,
} = require(`../data-service`);
const mainRouterAPI = require(`./main-routes`);
const myRouterAPI = require(`./my-routes`);
const articlesRouterAPI = require(`./articles-routes`);

const processDataMiddleware = require(`../middlewares/process-data-new-article`);

const router = new Router();

const API_BASE_URL = `http://localhost:3000`;

const articlesDataService = new ArticleDataService(API_BASE_URL);
// const commentsDataService = new CommentsDataService(API_BASE_URL);

mainRouterAPI(router, articlesDataService);
myRouterAPI(router, articlesDataService/* , commentsDataService */);
articlesRouterAPI(router, articlesDataService, processDataMiddleware);

module.exports = router;
