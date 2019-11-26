export default {
  /**
   * If post is publised, it is public, if I am the author, I can view a draft anyway
   */
  async post(_parent, { id }, { prisma, userId }, _info) {
    const posts = await prisma.query.posts({
      where: {
        id,
        OR: [{ published: true }, { author: { id: userId } }]
      }
    });

    if (posts.length === 0) throw new Error("Post not found");
    return posts[0];
  },

  async user(_parent, args, { prisma }, _info) {
    const userExists = await prisma.exists.User({ id: args.id });
    if (!userExists) throw new Error("User does not exist");

    return await prisma.query.user({
      where: { id: args.id }
    });
  },

  async posts(_parent, args, { prisma }, info) {
    const opArgs = {
      where: {
        published: true
      }
    };

    if (args.query) {
      opArgs.where.OR = [
        { title_contains: args.query },
        { body_contains: args.query }
      ];
    }
    return await prisma.query.posts(opArgs, info);
  },

  async myPosts(_parent, args, { prisma, userId }, info) {
    if (!userId) throw new Error("Authentication required");

    const opArgs = { where: { author: { id: userId } } };

    if (args.query) {
      opArgs.where.OR = [
        { title_contains: args.query },
        { body_contains: args.query }
      ];
    }
    return await prisma.query.posts(opArgs, info);
  },

  async users(_parent, args, { prisma }, info) {
    const opArgs = {};

    if (args.query) {
      opArgs.where = {
        OR: [{ name_contains: args.query }, { email_contains: args.query }]
      };
    }
    return await prisma.query.users(opArgs, info);
  },

  async comments(_parent, _args, { prisma }, info) {
    return await prisma.query.comments(null, info);
  }
};
