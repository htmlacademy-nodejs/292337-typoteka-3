'use strict';

const {Router} = require(`express`);

const {
  CategorySevice,
  ArticleSevice,
  CommentSevice,
} = require(`../data-service`);

const categoryAPI = require(`./category`);
const articleAPI = require(`./article`);

const {getMockData} = require(`../lib/get-mock-data`);

const router = new Router();

(async () => {
  const mockData = await getMockData();

  categoryAPI(router, new CategorySevice(mockData));
  articleAPI(router, new ArticleSevice(mockData), new CommentSevice());
})();

module.exports = router;
