'use strict';

const request = require(`request-promise-native`);

class ArticlesDataService {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  async findAll() {
    return await request(`${this._baseUrl}/api/articles/`, {json: true});
  }

  async findOne(articleId) {
    return await request(`${this._baseUrl}/api/articles/${articleId}/`, {json: true});
  }

  async findLast(limit) {
    const articles = await this.findAll();

    return (articles.length > limit)
      ? articles.splice(-limit)
      : articles;
  }
}

module.exports = ArticlesDataService;
