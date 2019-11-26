import { GraphQLServer } from "graphql-yoga";
import resolvers, { fragmentReplacements } from "./resolvers";

import prisma from "./prisma";
import getUserId from "./utils/getUserIdFromAuth";

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  async context(req) {
    const userId = await getUserId(req.request.headers.authorization, prisma);
    return { prisma, userId };
  },
  fragmentReplacements
});

server.start(() => console.log("Server Up..."));
