'use strict';

class SearchService {
  constructor() {
    this._articles = null;
  }

  set articles(data) {
    this._articles = data;
  }

  get articles() {
    return this._articles;
  }

  findBy(query) {
    return query.length > 0
      ? this._articles.filter((article) => article.title.includes(query))
      : [];
  }
}

module.exports = SearchService;
