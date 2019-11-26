export default {
  /**
   * If post is publised, it is public, if I am the author, I can view a draft anyway
   *
   * Pagination
   *
   * let skip = 0
   * first: 20
   * skip 0, on second call, skip+=first
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
      first: args.first,
      skip: args.skip,
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

    const opArgs = {
      first: args.first,
      skip: args.skip,
      where: { author: { id: userId } }
    };

    if (args.query) {
      opArgs.where.OR = [
        { title_contains: args.query },
        { body_contains: args.query }
      ];
    }
    return await prisma.query.posts(opArgs, info);
  },

  async users(_parent, args, { prisma }, info) {
    const opArgs = {
      first: args.first,
      skip: args.skip
    };

    if (args.query) {
      opArgs.where = {
        name_contains: args.query
      };
    }
    return await prisma.query.users(opArgs, info);
  },

  async comments(_parent, _args, { prisma }, info) {
    const opArgs = {
      first: args.first,
      skip: args.skip
    };

    return await prisma.query.comments(opArgs, info);
  }
};
