'use strict';

const {Router} = require(`express`);

const categoryAPI = require(`./category`);
const articleAPI = require(`./article`);
const searchAPI = require(`./search`);
const {getMockData} = require(`../lib/get-mock-data`);

const {
  CategoryService,
  ArticleService,
  CommentService,
  SearchService,
} = require(`../data-service`);

const categoryService = new CategoryService();
const articleService = new ArticleService();
const commentService = new CommentService();
const searchService = new SearchService();
const router = new Router();

let mockData = null;

router.use(`/`, async (req, res, next) => {
  if (!mockData) {
    mockData = await getMockData();

    categoryService.articles = mockData;
    articleService.articles = mockData;
    searchService.articles = mockData;
  }

  next();
})();

categoryAPI(router, categoryService);
articleAPI(router, articleService, commentService);
searchAPI(router, searchService);

module.exports = router;
