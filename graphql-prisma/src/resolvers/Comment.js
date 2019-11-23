export default {
  post(comment, _args, { db }, _info) {
    return db.posts.find(post => post.id == comment.post);
  },

  author(comment, _args, { db }, _info) {
    return db.users.find(user => user.id == comment.author);
  }
};