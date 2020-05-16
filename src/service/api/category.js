'use strict';

const {Router} = require(`express`);

const {HttpCode} = require(`../../constants`);

const router = new Router();

module.exports = (parentRouter, categoryDataService) => {
  parentRouter.use(`/categories`, router);

  router.get(`/`, (req, res) => {
    const categories = categoryDataService.findAll();

    return res
      .status(HttpCode.OK)
      .json(categories);
  });
};
