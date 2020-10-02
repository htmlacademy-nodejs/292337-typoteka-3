'use strict';

const path = require(`path`);
const express = require(`express`);
// const formidableMiddleware = require(`express-formidable`);
// fork express-formiddable based on formiddable@canary See: https://github.com/node-formidable/formidable/issues/633
const formidableMiddleware = require(`./middlewares/express-formidable`);

const router = require(`./routes`);

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

// middleware: Обработка форм
app.use(
    formidableMiddleware({
      multiples: true,
      uploadDir: path.resolve(__dirname, `./tmp`)
    })
);

// Роутеры
app.use(`/`, router);

app.listen(DEFAULT_PORT, ()=> {
  console.log(`Сервер стартовал на http://localhost:${DEFAULT_PORT}`);
});
