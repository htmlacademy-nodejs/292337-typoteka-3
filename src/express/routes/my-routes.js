'use strict';

const {Router} = require(`express`);

const myRouter = new Router();

myRouter.get(`/`, (req, res) => res.render(`admin/my`, {userRole: `admin`}));
myRouter.get(`/comments`, (req, res) => res.render(`admin/comments`, {userRole: `admin`}));

module.exports = myRouter;
