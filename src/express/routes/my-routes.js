'use strict';

const {Router} = require(`express`);

const myRouter = new Router();

module.exports = (parentRouter, articlesDataService/* , commentsDataService */) => {
  parentRouter.use(`/my`, myRouter);

  myRouter.get(`/`, async (req, res) => {
    const articles = articlesDataService.sortNewest(
        await articlesDataService.findAll(),
    );

    res.render(`admin/my`, {
      userRole: `admin`,
      articles,
    });
  });

  myRouter.get(`/comments`, async (req, res) => {
    const lastArticles = await articlesDataService.findLast(3);
    // const comments = await commentsDataService.findAll(lastArticles);

    res.render(`admin/comments`, {
      userRole: `admin`,
      articles: lastArticles,
    });
  });
};
