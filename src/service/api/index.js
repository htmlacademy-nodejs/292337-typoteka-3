'use strict';

const {Router} = require(`express`);

const {
  CategorySevice,
} = require(`../data-service`);

const {getMockData} = require(`../lib/get-mock-data`);

const router = new Router();

(async () => {
  const mockData = await getMockData();

  // TODO: add api routers
})();

module.exports = router;
