'use strict';

class CategoryService {
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
    const categories = this._articles.reduce((acc, article) => {
      acc.add(...article.category);

      return acc;
    }, new Set());

    return [...categories];
  }
}

module.exports = CategoryService;
