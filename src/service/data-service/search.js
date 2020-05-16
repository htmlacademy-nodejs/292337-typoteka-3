'use strict';

class SearchService {
  constructor(articles) {
    this._articles = articles;
  }

  findBy(query) {
    return query.length > 0
      ? this._articles.filter((article) => article.title.includes(query))
      : [];
  }
}

module.exports = SearchService;
