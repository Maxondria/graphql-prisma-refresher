import { GraphQLServer } from "graphql-yoga";
import resolvers, { fragmentReplacements } from "./resolvers";

import prisma from "./prisma";
import getUserId from "./utils/getUserIdFromAuth";

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  async context(req) {
    const bearerToken = req.request
      ? req.request.headers.authorization
      : req.connection.context.Authorization;
    //now we can access userId on subscriptions too
    const userId = await getUserId(bearerToken, prisma);
    return { prisma, userId };
  },
  fragmentReplacements
});

server.start(() => console.log("Server Up..."));
