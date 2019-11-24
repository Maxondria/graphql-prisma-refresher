export default {
  async post(_parent, args, { prisma }, _info) {
    const postExists = await prisma.exists.Post({ id: args.id });
    if (!postExists) throw new Error("Post does not exist");

    return await prisma.query.post({
      where: { id: args.id }
    });
  },

  async user(_parent, args, { prisma }, _info) {
    const userExists = await prisma.exists.User({ id: args.id });
    if (!userExists) throw new Error("User does not exist");

    return await prisma.query.user({
      where: { id: args.id }
    });
  },

  async posts(_parent, args, { prisma }, info) {
    const opArgs = {};

    if (args.query) {
      opArgs.where = {
        OR: [{ title_contains: args.query }, { body_contains: args.query }]
      };
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
