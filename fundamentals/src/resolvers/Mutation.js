import uuidv4 from "uuid/v4";

export default {
  createUser(_parent, args, { db }, _info) {
    const emailTaken = db.users.some(user => user.email === args.data.email);

    if (emailTaken) throw new Error("Email Already In Use");
    const user = { id: uuidv4(), ...args.data };
    db.users.push(user);
    return user;
  },

  deleteUser(_parent, args, { db }, _info) {
    const userIndex = db.users.findIndex(user => user.id == args.id);

    if (userIndex === -1) throw new Error("User does not exist!");
    const [deletedUser] = db.users.splice(userIndex, 1);
    //cascade posts and users
    posts = db.posts.filter(post => {
      const match = post.author == args.id;
      if (match) {
        comments = db.comments.filter(comment => comment.post != post.id);
      }
      return !match;
    });

    comments = db.comments.filter(comment => comment.author != args.id);

    return deletedUser;
  },

  updateUser(_parent, { id, data }, { db }, _info) {
    const user = db.users.find(user => user.id == id);

    if (!user) throw new Error("User does not exist!");
    let updatedUser;
    db.users = db.users.map(user => {
      if (user.id == id) {
        updatedUser = { ...user, ...data };
        return updatedUser;
      } else return user;
    });
    return updatedUser;
  },

  createPost(_parent, args, { db }, _info) {
    const authorExists = db.users.some(user => user.id == args.data.author);

    if (!authorExists) throw new Error("Author does not exist!");
    const post = { id: uuidv4(), ...args.data };
    db.posts.push(post);
    return post;
  },

  updatePost(_parent, { id, data }, { db }, _info) {
    const post = db.posts.find(post => post.id == id);

    if (!post) throw new Error("Post does not exist!");
    let updatedPost;
    db.posts = db.posts.map(post => {
      if (post.id == id) {
        updatedPost = { ...post, ...data };
        return updatedPost;
      } else return post;
    });
    return updatedPost;
  },

  deletePost(_parent, args, { db }, _info) {
    const postIndex = db.posts.findIndex(post => post.id == args.id);
    if (postIndex === -1) throw new Error("Post does not exist!");
    const [deletedPost] = db.posts.splice(postIndex, 1);
    //cascade posts and users
    comments = db.comments.filter(comment => comment.post != args.id);
    return deletedPost;
  },

  createComment(_parent, args, { db }, _info) {
    const authorExists = db.users.some(user => user.id == args.data.author);
    const postExists = db.posts.some(post => post.id == args.data.post);

    if (!authorExists || !postExists)
      throw new Error("Author Or Post does not exist!");

    const comment = { id: uuidv4(), ...args.data };
    db.comments.push(comment);
    return comment;
  },

  updateComment(_parent, { id, data }, { db }, _info) {
    const comment = db.comments.find(comment => comment.id == id);

    if (!comment) throw new Error("Comment does not exist!");
    let updatedComment;
    db.comments = db.comments.map(comment => {
      if (comment.id == id) {
        updatedComment = { ...comment, ...data };
        return updatedComment;
      } else return comment;
    });
    return updatedComment;
  },

  deleteComment(_parent, args, { db }, _info) {
    const commentIndex = db.comments.findIndex(
      comment => comment.id == args.id
    );
    if (commentIndex === -1) throw new Error("Comment does not exist!");
    const [deletedComment] = db.comments.splice(commentIndex, 1);
    return deletedComment;
  }
};
