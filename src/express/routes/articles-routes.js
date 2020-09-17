'use strict';

const {Router} = require(`express`);

const articlesRouter = new Router();

module.exports = (parentRouter, articlesDataService, processDataMiddleware) => {
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

  /*
    TODO: В express приложении (./express) создайте обработчик маршрута POST /articles/add. В обработчике реализуйте получение данных из формы. Полученные данные отправьте API-сервису на ресурс /api/articles методом POST.

    TODO: После успешной обработки данных из формы выполните перенаправление (redirect) на страницу «Мои объявления» (/my). В случае возникновения ошибок пользователь должен вернуться на страницу /articles/add. Форма должна быть заполнена введёнными данными.
  */
  articlesRouter.post(`/add`, processDataMiddleware, (req, res) => {
    console.log(res.locals);

    res.render(`admin/new-post`, {
      userRole: `admin`,
    });
  });
};
