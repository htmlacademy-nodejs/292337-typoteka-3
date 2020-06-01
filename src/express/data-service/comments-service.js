'use strict';

class CommentsDataService {
  findAll(articles) {
    if (!articles) {
      return [];
    }

    const comments = articles.reduce((acc, article) => {
      acc.add(article.comments);

      return acc;
    }, new Set());

    return comments;
  }
}

module.exports = CommentsDataService;
