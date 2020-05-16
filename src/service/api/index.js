'use strict';

const {Router} = require(`express`);

const {
  CategorySevice,
  ArticleSevice,
  CommentSevice,
  SearchService,
} = require(`../data-service`);

const categoryAPI = require(`./category`);
const articleAPI = require(`./article`);
const searchAPI = require(`./search`);

const {getMockData} = require(`../lib/get-mock-data`);

const router = new Router();

(async () => {
  const mockData = await getMockData();

  categoryAPI(router, new CategorySevice(mockData));
  articleAPI(router, new ArticleSevice(mockData), new CommentSevice());
  searchAPI(router, new SearchService(mockData));
})();

module.exports = router;
