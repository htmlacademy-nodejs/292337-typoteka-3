'use strict';

const path = require(`path`);
const express = require(`express`);

const mainRouter = require(`./routes/main-routes`);
const myRouter = require(`./routes/my-routes`);
const articlesRouter = require(`./routes/articles-routes`);

const DEFAULT_PORT = 8080;

const app = express();

// Шаблонизация
app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

// middleware: Отдача статики JS, CSS, IMG, FONTS
app.use(
    express.static(
        path.resolve(__dirname, `public`)
    )
);

// Роутеры
app.use(`/`, mainRouter);
app.use(`/my`, myRouter);
app.use(`/articles`, articlesRouter);

app.listen(DEFAULT_PORT, ()=> {
  console.log(`Сервер стартовал на http://localhost:${DEFAULT_PORT}`);
});
