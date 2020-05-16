'use strict';

const {Router} = require(`express`);

const {HttpCode} = require(`../../constants`);
const searchValidator = require(`../middlewares/search-validator`)([`query`]);

const router = new Router();

module.exports = (parentRouter, searchDataService) => {
  parentRouter.use(`/search`, router);

  router.get(`/`, searchValidator, (req, res) => {
    const {query} = req.query;
    const articles = searchDataService.findBy(query);

    res
      .status(HttpCode.OK)
      .json(articles);
  });
};
