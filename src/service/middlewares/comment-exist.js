'use strict';

const {HttpCode} = require(`../../constants`);

module.exports = (commentDataService) => (req, res, next) => {
  const {article} = res.locals;
  const {commentId} = req.params;
  const comment = commentDataService.findOne(commentId, article);

  if (!comment) {
    return res
      .status(HttpCode.NOT_FOUND)
      .send(`Can't find comment with ${commentId}`);
  }

  res.locals.comment = comment;

  return next();
};
