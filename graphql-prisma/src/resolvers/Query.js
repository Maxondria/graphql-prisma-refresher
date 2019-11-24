export default {
  post(_parent, args, { db }, _info) {
    return db.posts.find(post => post.id === Number(args.id));
  },

  user(_parent, args, { db }, _info) {
    return db.users.find(user => user.id === Number(args.id));
  },

  async posts(_parent, args, { prisma }, info) {
    // if (args.query) {
    //   return db.posts.filter(post =>
    //     post.title.toLowerCase().includes(args.query.toLowerCase())
    //   );
    // } else return db.posts;
    return await prisma.query.posts(null, info);
  },

  async users(_parent, args, { prisma }, info) {
    const opArgs = {};

    if (args.query) {
      opArgs.where = {
        name_contains: args.query
      };
    }
    return await prisma.query.users(opArgs, info);
  },

  comments(_parent, _args, { db }, _info) {
    return db.comments;
  }
};
