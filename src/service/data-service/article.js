'use strict';

const {nanoid} = require(`nanoid`);

const {MAX_ID_LENGTH} = require(`../../constants`);

class ArticleService {
  constructor() {
    this._articles = null;
  }

  set articles(data) {
    this._articles = data;
  }

  get articles() {
    return this._articles;
  }

  findAll() {
    return this._articles;
  }

  findOne(id) {
    return this._articles.find((article) => article.id === id);
  }

  create(data) {
    const newArticle = Object.assign(
        {
          id: nanoid(MAX_ID_LENGTH),
          comments: [],
        },
        data,
    );

    this._articles.push(newArticle);

    return newArticle;
  }

  update(id, data) {
    const oldArticle = this.findOne(id);

    return Object.assign(oldArticle, data);
  }

  drop(id) {
    const deletedArticle = this._articles.find((article) => article.id === id);

    if (!deletedArticle) {
      return null;
    }

    this._articles = this._articles.filter((article) => article.id !== id);

    return deletedArticle;
  }
}

module.exports = ArticleService;
