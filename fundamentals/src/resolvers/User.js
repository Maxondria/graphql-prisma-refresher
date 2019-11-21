export default {
  posts(user, _args, { db }, _info) {
    return db.posts.filter(post => post.author == user.id);
  },

  comments(user, _args, { db }, _info) {
    return db.comments.filter(comment => comment.author == user.id);
  }
};