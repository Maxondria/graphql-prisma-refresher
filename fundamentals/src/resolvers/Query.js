export default {
  post(_parent, args, { db }, _info) {
    return db.posts.find(post => post.id === Number(args.id));
  },

  user(_parent, args, { db }, _info) {
    return db.users.find(user => user.id === Number(args.id));
  },

  posts(_parent, args, { db }, _info) {
    if (args.query) {
      return db.posts.filter(post =>
        post.title.toLowerCase().includes(args.query.toLowerCase())
      );
    } else return db.posts;
  },

  users(_parent, args, { db }, _info) {
    if (args.query) {
      return db.users.filter(user =>
        user.name.toLowerCase().includes(args.query.toLowerCase())
      );
    }
    return db.users;
  },

  comments(_parent, _args, { db }, _info) {
    return db.comments;
  }
};