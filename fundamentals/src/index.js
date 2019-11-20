import { GraphQLServer } from "graphql-yoga";

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
  }

  type User {
      id: ID!
      name: String!
      email: String!
      age: Int
  }

  type Post {
      id: ID!
      title: String!
      body: String!
      author: User!
      published: Boolean!
  }
 `;

/**
 * Resolvers
 */
const users = [
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

const posts = [
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
    }
  },
  Post: {
    author(post, _args, _ctx, _info) {
      return users.find(user => user.id == post.author);
    }
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => console.log("Server Up..."));
