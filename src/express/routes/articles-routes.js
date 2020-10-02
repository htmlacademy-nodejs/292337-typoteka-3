'use strict';

const {Router} = require(`express`);
const {ALLOWED_FILETYPES} = require(`../../constants`);
const adapter = require(`../lib/data-adapter`);

const articlesRouter = new Router();

module.exports = (parentRouter, articlesDataService, processDataMiddleware) => {
  parentRouter.use(`/articles`, articlesRouter);

  articlesRouter.get(`/add`, (req, res) => {
    res.render(`admin/new-post`, {
      userRole: `admin`,
      article: adapter({}),
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

  articlesRouter.post(`/add`, processDataMiddleware, async (req, res) => {
    const {data: article} = res.locals;

    try {
      await articlesDataService.create(article);

      res.redirect(`/my`);
    } catch (error) {
      res.render(`admin/new-post`, {
        userRole: `admin`,
        allowedFileTypes: ALLOWED_FILETYPES,
        article,
        error,
      });
    }
  });
};
