'use strict';

const {Router} = require(`express`);

const {
  CategorySevice,
} = require(`../data-service`);

const categoryAPI = require(`./category`);

const {getMockData} = require(`../lib/get-mock-data`);

const router = new Router();

(async () => {
  const mockData = await getMockData();

  categoryAPI(router, new CategorySevice(mockData));
})();

module.exports = router;
