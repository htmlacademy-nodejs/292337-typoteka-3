'use strict';

const {nanoid} = require(`nanoid`);

const {MAX_ID_LENGTH} = require(`../../constants`);

class CommentService {
  findAll(article) {
    return article.comments;
  }

  findOne(id, article) {
    return article.comments.find((item) => item.id === id);
  }

  create(data, article) {
    const newComment = Object.assign(
        {
          id: nanoid(MAX_ID_LENGTH),
        },
        data,
    );

    article.comments.push(newComment);

    return newComment;
  }

  drop(id, article) {
    const deletedComment = article.comments.find((item) => item.id === id);

    if (!deletedComment) {
      return null;
    }

    article.comments = article.comments.filter((item) => item.id !== id);

    return deletedComment;
  }
}

module.exports = CommentService;
