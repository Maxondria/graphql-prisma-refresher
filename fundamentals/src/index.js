import { GraphQLServer } from "graphql-yoga";

/**
 * Schema - (Type definitions)
 */

const typeDefs = `
  type Query {
      hello: String!
  }
 `;

/**
 * Resolvers
 */
const resolvers = {
  Query: {
    hello() {
      return "Hello, GraphQL yoga!!!";
    }
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => console.log("Server Up..."));
