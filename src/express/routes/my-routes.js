'use strict';

const {Router} = require(`express`);

const myRouter = new Router();

myRouter.get(`/`, (req, res) => res.send(`/my/`));
myRouter.get(`/comments`, (req, res) => res.render(`admin/comments`));

module.exports = myRouter;
