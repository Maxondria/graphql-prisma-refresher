import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
      token: jwt.sign({ userId: user.id }, "SECURE")
    };
  },

  async deleteUser(_parent, args, { prisma }, info) {
    const userExists = await prisma.exists.User({ id: args.id });
    if (!userExists) throw new Error("User doesn't exist");

    return await prisma.mutation.deleteUser({ where: { id: args.id } }, info);
  },

  async updateUser(_parent, { id, data }, { prisma }, info) {
    const userExists = await prisma.exists.User({ id });
    if (!userExists) throw new Error("User doesn't exist");

    return await prisma.mutation.updateUser({ where: { id }, data }, info);
  },

  async createPost(
    _parent,
    { data: { title, body, published, author } },
    { prisma },
    info
  ) {
    const authorExists = await prisma.exists.User({ id: author });
    if (!authorExists) throw new Error("Author doesn't exist");

    return await prisma.mutation.createPost(
      { data: { title, body, published, author: { connect: { id: author } } } },
      info
    );
  },

  async updatePost(_parent, { id, data }, { prisma }, info) {
    const postExists = await prisma.exists.Post({ id });
    if (!postExists) throw new Error("Post doesn't exist");

    return await prisma.mutation.updatePost({ where: { id }, data }, info);
  },

  async deletePost(_parent, { id }, { prisma }, info) {
    const postExists = await prisma.exists.Post({ id });
    if (!postExists) throw new Error("Post doesn't exist");

    return await prisma.mutation.deletePost({ where: { id } }, info);
  },

  async createComment(
    _parent,
    { data: { text, post, author } },
    { prisma },
    info
  ) {
    const postExists = await prisma.exists.Post({ id: post });
    const authorExists = await prisma.exists.User({ id: author });

    if (!authorExists || !postExists)
      throw new Error("Author Or Post does not exist!");

    return await prisma.mutation.createComment(
      {
        data: {
          text,
          author: { connect: { id: author } },
          post: { connect: { id: post } }
        }
      },
      info
    );
  },

  async updateComment(_parent, { id, data }, { prisma }, info) {
    const commentExists = await prisma.exists.Comment({ id });
    if (!commentExists) throw new Error("Comment doesn't exist");

    return await prisma.mutation.updateComment({ where: { id }, data }, info);
  },

  async deleteComment(_parent, { id }, { prisma }, info) {
    const commentExists = await prisma.exists.Comment({ id });
    if (!commentExists) throw new Error("Comment doesn't exist");

    return await prisma.mutation.deleteComment({ where: { id } }, info);
  }
};
