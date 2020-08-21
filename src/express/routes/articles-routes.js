'use strict';

const {Router} = require(`express`);

const articlesRouter = new Router();

module.exports = (parentRouter, articlesDataService) => {
  parentRouter.use(`/articles`, articlesRouter);

  articlesRouter.get(`/add`, (req, res) => {
    res.render(`admin/new-post`, {
      userRole: `admin`,
    });
  });
  articlesRouter.get(`/:id`, (req, res) => res.render(`post`));
  articlesRouter.get(`/edit/:id`, async (req, res) => {
    const {id: articleId} = req.params;
    const article = await articlesDataService.findOne(articleId);

    res.render(`admin/edit-post`, {
      userRole: `admin`,
      article,
    });
  });
  articlesRouter.get(`/category/:id`, (req, res) => res.render(`articles-by-category`));

  articlesRouter.post(`/add`, (req, res) => {
    res.render(`admin/new-post`, {
      userRole: `admin`,
    });
  });
};
