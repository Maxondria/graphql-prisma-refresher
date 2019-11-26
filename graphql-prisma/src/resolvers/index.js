import { extractFragmentReplacements } from "prisma-binding";

import Query from "./Query";
import Comment from "./Comment";
import Post from "./Post";
import User from "./User";
import Mutation from "./Mutation";
import Subscription from "./Subscription";

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Post,
  Comment
};

const fragmentReplacements = extractFragmentReplacements(resolvers);

export { resolvers as default, fragmentReplacements };
