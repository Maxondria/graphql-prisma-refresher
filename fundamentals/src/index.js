import { GraphQLServer } from "graphql-yoga";

import db from "./db";

import Query from "./resolvers/Query";
import Comment from "./resolvers/Comment";
import Post from "./resolvers/Post";
import User from "./resolvers/User";
import Mutation from "./resolvers/Mutation";

const resolvers = {
  Query,
  Comment,
  Post,
  User,
  Mutation
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: { db }
});

server.start(() => console.log("Server Up..."));
