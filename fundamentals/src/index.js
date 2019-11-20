import { GraphQLServer } from "graphql-yoga";

/**
 * Schema - (Type definitions)
 */

const typeDefs = `
  type Query {
      me: User!
      posts: [Post!]! 
      add(numbers: [Float!]!): Float!
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
      published: Boolean!
  }
 `;

/**
 * Resolvers
 */
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
    posts() {
      return [
        {
          id: 45,
          title: "VS Code Is Actually Powerful",
          body: "Yo, sure Ms is making wonders and miracles",
          published: false
        }
      ];
    },
    add(parent, args, ctx) {
      return args.numbers.reduce((prev, curr) => prev + curr, 0);
    }
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => console.log("Server Up..."));
