'use strict';

const {Router} = require(`express`);

const mainRouter = new Router();

module.exports = (parentRouter, articlesDataService) => {
  parentRouter.use(`/`, mainRouter);

  mainRouter.get(`/`, async (req, res) => {
    const articles = await articlesDataService.findAll();

    res.render(`main`, {articles});
  });

  mainRouter.get(`/register`, (req, res) => res.render(`sign-up`));
  mainRouter.get(`/login`, (req, res) => res.render(`login`));
  mainRouter.get(`/search`, (req, res) => res.render(`search`));
  mainRouter.get(`/categories`, (req, res) => res.render(`admin/all-categories`, {userRole: `admin`}));
};
