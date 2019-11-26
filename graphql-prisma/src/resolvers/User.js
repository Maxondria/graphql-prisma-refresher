export default {
  email: {
    fragment: "fragment userID on User { id }", //cater for when 'id' isn't among the selection fields
    resolve(user, _args, { userId }, _info) {
      if (userId && userId === user.id) return user.email;
      return null;
    }
  },
  posts: {
    fragment: "fragment userIDandPost on User { id }",
    async resolve(user, _args, { prisma }, _info) {
      return await prisma.query.posts({
        where: {
          AND: [{ author: { id: user.id } }, { published: true }]
        }
      });
    }
  }
};
