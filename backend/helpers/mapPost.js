const mongoose = require('mongoose');
const mapComment = require('./mapComment');

module.exports = function (post) {
  return {
    id: post._id,
    title: post.title,
    imageUrl: post.image_url,
    content: post.content,
    publishedAt: post.createdAt,
    comments: post.comments.map((comment) =>
      mongoose.isObjectIdOrHexString(comment) ? comment : mapComment(comment)
    ),
  };
};
