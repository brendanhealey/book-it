import { getUserResolver } from "schema/resolvers/getUserResolver";
import { secured } from "schema/resolvers/secured";
import { userLoginResolver } from "schema/resolvers/userLoginResolver";
import { ServerContext } from "server";

export const resolvers = {
  Query: {
    getUser: async (_, args, context: ServerContext) =>
      secured(getUserResolver, context, args),
    // getUserResolver(args),
  },
  Mutation: {
    userLogin: async (_, { email, password }) =>
      userLoginResolver(email, password),
  },
};
