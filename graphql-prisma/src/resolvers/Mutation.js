import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

export default {
  async createUser(_parent, args, { prisma }, _info) {
    const emailTaken = await prisma.exists.User({ email: args.data.email });
    if (emailTaken) throw new Error("Email already in use");

    if (args.data.password.length < 6)
      throw new Error("Passwords must be 6 atleast characters");

    const password = await bcrypt.hash(args.data.password, 10);

    //Leaving info, we will return all scalar fields
    const user = await prisma.mutation.createUser({
      data: { ...args.data, password }
    });

    return {
      user,
      token: JWT.sign({ userId: user.id }, "SECURE")
    };
  },

  async loginUser(_parent, { data: { email, password } }, { prisma }, _info) {
    const user = await prisma.query.user({ where: { email } });
    if (!user) throw new Error("Oops, Authentication Error");

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) throw new Error("Oops, Authentication Error");

    return {
      user,
      token: JWT.sign({ userId: user.id }, "SECURE")
    };
  },

  async deleteUser(_parent, _args, { prisma, userId }, info) {
    if (!userId) throw new Error("Authentication required");
    return await prisma.mutation.deleteUser({ where: { id: userId } }, info);
  },

  async updateUser(_parent, { data }, { prisma, userId }, info) {
    if (!userId) throw new Error("Authentication required");
    return await prisma.mutation.updateUser(
      { where: { id: userId }, data },
      info
    );
  },

  async createPost(
    _parent,
    { data: { title, body, published } },
    { prisma, userId },
    info
  ) {
    if (!userId) throw new Error("Authentication required");
    return await prisma.mutation.createPost(
      { data: { title, body, published, author: { connect: { id: userId } } } },
      info
    );
  },

  async updatePost(_parent, { id, data }, { prisma, userId }, info) {
    if (!userId) throw new Error("Authentication required");

    const post = await prisma.exists.Post({
      id,
      author: { id: userId }
    });
    if (!post) throw new Error("Post doesn't exist");

    if (!data.published) {
      await prisma.mutation.deleteManyComments({
        where: { post: { id } }
      });
    }
    return await prisma.mutation.updatePost({ where: { id }, data }, info);
  },

  async deletePost(_parent, { id }, { prisma, userId }, info) {
    if (!userId) throw new Error("Authentication required");

    const postExists = await prisma.exists.Post({
      id,
      author: { id: userId }
    });
    if (!postExists) throw new Error("Post doesn't exist");

    return await prisma.mutation.deletePost({ where: { id } }, info);
  },

  async createComment(
    _parent,
    { data: { text, post } },
    { prisma, userId },
    info
  ) {
    if (!userId) throw new Error("Authentication required");

    const postExists = await prisma.exists.Post({ id: post, published: true });
    if (!postExists) throw new Error("Post does not exist!");

    return await prisma.mutation.createComment(
      {
        data: {
          text,
          author: { connect: { id: userId } },
          post: { connect: { id: post } }
        }
      },
      info
    );
  },

  async updateComment(_parent, { id, data }, { prisma, userId }, info) {
    if (!userId) throw new Error("Authentication required");

    const commentExists = await prisma.exists.Comment({
      id,
      author: { id: userId }
    });
    if (!commentExists) throw new Error("Comment doesn't exist");

    return await prisma.mutation.updateComment({ where: { id }, data }, info);
  },

  async deleteComment(_parent, { id }, { prisma, userId }, info) {
    if (!userId) throw new Error("Authentication required");

    const commentExists = await prisma.exists.Comment({
      id,
      author: { id: userId }
    });
    if (!commentExists) throw new Error("Comment doesn't exist");

    return await prisma.mutation.deleteComment({ where: { id } }, info);
  }
};
