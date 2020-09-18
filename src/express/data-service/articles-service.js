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

  async create(data) {
    return await request.post(
        `${this._baseUrl}/api/articles/`,
        {
          json: data,
        });
  }

  sortNewest(articles, limit) {
    const newestArticles = [...articles].sort((a, b) => {
      if (a.createdDate > b.createdDate) {
        return -1;
      }

      if (a.createdDate < b.createdDate) {
        return 1;
      }

      return 0;
    });

    if (limit && newestArticles.length > limit) {
      newestArticles.length = limit;
    }

    return newestArticles;
  }

  sortMostCommented(articles, limit) {
    const mostCommentedArticles = [...articles].sort((a, b) => b.comments.length - a.comments.length);

    if (limit && mostCommentedArticles.length > limit) {
      mostCommentedArticles.length = limit;
    }

    return mostCommentedArticles;
  }
}

module.exports = ArticlesDataService;
