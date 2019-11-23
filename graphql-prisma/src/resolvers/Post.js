export default {
  author(post, _args, { db }, _info) {
    return db.users.find(user => user.id == post.author);
  },

  comments(post, _args, { db }, _info) {
    return db.comments.filter(comment => comment.post == post.id);
  }
};