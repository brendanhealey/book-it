import { getUserResolver } from "gql/resolvers/getUserResolver";
import { secured } from "gql/resolvers/secured";
import { userLoginResolver } from "gql/resolvers/userLoginResolver";
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
