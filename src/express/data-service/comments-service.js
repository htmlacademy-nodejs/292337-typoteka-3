'use strict';

const request = require(`request-promise-native`);

class CommentsDataService {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  async findAll(articles) {
    if (!articles) {
      return [];
    }

    const promises = articles.map((article) => {
      return request(`${this._baseUrl}/api/articles/${article.id}/comments/`, {json: true});
    });

    const comments = await Promise.all(promises);

    return comments;
  }
}

module.exports = CommentsDataService;
