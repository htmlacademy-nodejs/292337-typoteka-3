'use strict';

const {Router} = require(`express`);

const maxItemsLimit = {
  NEWEST: 8,
  MOST_COMMENTED: 4,
};

const mainRouter = new Router();

module.exports = (parentRouter, articlesDataService) => {
  parentRouter.use(`/`, mainRouter);

  mainRouter.get(`/`, async (req, res) => {
    const articles = await articlesDataService.findAll();
    const newestArticles = articlesDataService.sortNewest(
        articles,
        maxItemsLimit.NEWEST,
    );
    const mostCommentedArticles = articlesDataService.sortMostCommented(
        articles,
        maxItemsLimit.MOST_COMMENTED,
    );

    // TODO: Сделать блок "Последние комментарии"

    res.render(`main`, {newestArticles, mostCommentedArticles});
  });

  mainRouter.get(`/register`, (req, res) => res.render(`sign-up`));
  mainRouter.get(`/login`, (req, res) => res.render(`login`));
  mainRouter.get(`/search`, (req, res) => res.render(`search`));
  mainRouter.get(`/categories`, (req, res) => res.render(`admin/all-categories`, {userRole: `admin`}));
};
