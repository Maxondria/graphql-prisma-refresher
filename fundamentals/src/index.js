import { GraphQLServer } from "graphql-yoga";
import uuidv4 from "uuid/v4";

/**
 * Schema - (Type definitions)
 */

const typeDefs = `
  type Query {
      me: User!
      post(id: ID!): Post!
      user(id: ID!): User!
      posts(query: String): [Post!]! 
      users(query: String): [User!]!
      comments: [Comment!]!
  }

  type Mutation {
    createUser(data: createUserInput): User!
    createPost(data: createPostInput): Post!
    createComment(data: createCommentInput): Comment!
    deleteUser(id: ID!): User!
    deletePost(id: ID!): Post!
    deleteComment(id: ID!): Comment!
  }

  input createUserInput {
    name: String!
    email: String!
    age: Int
  }

  input createPostInput {
    title: String!
    body: String!
    published: Boolean!
    author: ID!
  }

  input createCommentInput {
    text: String!
    post: ID!
    author: ID!
  }

  type User {
      id: ID!
      name: String!
      email: String!
      age: Int
      posts: [Post!]!
      comments: [Comment!]!
  }

  type Post {
      id: ID!
      title: String!
      body: String!
      author: User!
      published: Boolean!
      comments: [Comment!]!
  }

  type Comment {
      id: ID!
      text: String!
      post: Post!
      author: User! 
  }
 `;

/**
 * Resolvers
 */
let users = [
  {
    id: 4,
    name: "Tayebwa Maxon",
    email: "maxtayebw@gmail.com",
    age: 45
  },
  {
    id: 5,
    name: "Mucunguzi Colson",
    email: "colsonmucu@gmail.com",
    age: 55
  },
  {
    id: 6,
    name: "Isaiah Chebrot",
    email: "isaiah@gmail.com"
  }
];

let posts = [
  {
    id: 45,
    title: "VS Code Is Actually Powerful",
    body: "Yo, sure Ms is making wonders and miracles",
    published: false,
    author: 4
  },
  {
    id: 46,
    title: "Javascript is King",
    body: "The Internals of JS are amazing",
    published: false,
    author: 5
  },
  {
    id: 47,
    title: "Secret to GraphQL",
    body: "Your Schema feels fine? It probably is!",
    published: true,
    author: 6
  }
];

let comments = [
  {
    id: 1,
    text: "Yo Nigga, that's dope",
    post: 45,
    author: 4
  },
  {
    id: 2,
    text: "Hahahaha",
    post: 46,
    author: 5
  },
  {
    id: 3,
    text: "Am telling you...",
    post: 47,
    author: 6
  },
  {
    id: 4,
    text: "JS is king!, Damn...",
    post: 45,
    author: 5
  }
];

const resolvers = {
  Query: {
    me() {
      return {
        id: 4,
        name: "Tayebwa Maxon",
        email: "maxtayebw@gmail.com",
        age: 45
      };
    },
    post(_parent, args, _ctx, _info) {
      return posts.find(post => post.id === Number(args.id));
    },
    user(_parent, args, _ctx, _info) {
      return users.find(user => user.id === Number(args.id));
    },
    posts(_parent, args, _ctx, _info) {
      if (args.query) {
        return posts.filter(post =>
          post.title.toLowerCase().includes(args.query.toLowerCase())
        );
      } else return posts;
    },
    users(_parent, args, _ctx, _info) {
      if (args.query) {
        return users.filter(user =>
          user.name.toLowerCase().includes(args.query.toLowerCase())
        );
      }
      return users;
    },
    comments(_parent, args, _ctx, _info) {
      return comments;
    }
  },
  Comment: {
    post(comment, _args, _ctx, _info) {
      return posts.find(post => post.id == comment.post);
    },
    author(comment, _args, _ctx, _info) {
      return users.find(user => user.id == comment.author);
    }
  },
  Post: {
    author(post, _args, _ctx, _info) {
      return users.find(user => user.id == post.author);
    },
    comments(post, _args, _ctx, _info) {
      return comments.filter(comment => comment.post == post.id);
    }
  },
  User: {
    posts(user, _args, _ctx, _info) {
      return posts.filter(post => post.author == user.id);
    },
    comments(user, _args, _ctx, _info) {
      return comments.filter(comment => comment.author == user.id);
    }
  },
  Mutation: {
    createUser(_parent, args, _ctx, _info) {
      const emailTaken = users.some(user => user.email === args.data.email);

      if (emailTaken) throw new Error("Email Already In Use");
      const user = { id: uuidv4(), ...args.data };
      users.push(user);
      return user;
    },
    deleteUser(_parent, args, _ctx, _info) {
      const userIndex = users.findIndex(user => user.id == args.id);

      if (userIndex === -1) throw new Error("User does not exist!");
      const [deletedUser] = users.splice(userIndex, 1);
      //cascade posts and users
      posts = posts.filter(post => {
        const match = post.author == args.id;
        if (match) {
          comments = comments = comments.filter(
            comment => comment.post != post.id
          );
        }
        return !match;
      });

      comments = comments.filter(comment => comment.author != args.id);

      return deletedUser;
    },
    createPost(_parent, args, _ctx, _info) {
      const authorExists = users.some(user => user.id == args.data.author);

      if (!authorExists) throw new Error("Author does not exist!");
      const post = { id: uuidv4(), ...args.data };
      posts.push(post);
      return post;
    },
    deletePost(_parent, args, _ctx, _info) {
      const postIndex = posts.findIndex(post => post.id == args.id);
      if (postIndex === -1) throw new Error("Post does not exist!");
      const [deletedPost] = posts.splice(postIndex, 1);
      //cascade posts and users
      comments = comments.filter(comment => comment.post != args.id);
      return deletedPost;
    },
    createComment(_parent, args, _ctx, _info) {
      const authorExists = users.some(user => user.id == args.data.author);
      const postExists = posts.some(post => post.id == args.data.post);

      if (!authorExists || !postExists)
        throw new Error("Author Or Post does not exist!");

      const comment = { id: uuidv4(), ...args.data };
      comments.push(comment);
      return comment;
    },
    deleteComment(_parent, args, _ctx, _info) {
      const commentIndex = comments.findIndex(comment => comment.id == args.id);
      if (commentIndex === -1) throw new Error("Comment does not exist!");
      const [deletedComment] = comments.splice(commentIndex, 1);
      return deletedComment;
    }
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => console.log("Server Up..."));
