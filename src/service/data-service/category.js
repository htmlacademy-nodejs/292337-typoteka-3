'use strict';

class CategoryService {
  constructor(articles) {
    this._articles = articles;
  }

  findAll() {
    return this._articles.reduce((categories, article) => {
      categories.add([...article.category]);

      return [...categories];
    }, new Set());
  }
}

module.exports = CategoryService;
