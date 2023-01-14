import { Resolvers } from "gql/generated/resolverTypes";
import { getUserResolver } from "gql/resolvers/getUserResolver";
import { getUsersResolver } from "gql/resolvers/getUsersResolver";
import { userLoginResolver } from "gql/resolvers/userLoginResolver";
import { secured } from "gql/resolvers/secured";
import { IServerContext } from "server";

export const resolvers: Resolvers = {
  Query: {
    getUser: async (_, args, context: IServerContext) =>
      secured(getUserResolver, context, args),
    // getUserResolver(args), // the unsecured version
    getUsers: async (_, args, context: IServerContext) =>
      secured(getUsersResolver, context, args),
  },
  Mutation: {
    userLogin: async (_, args) => userLoginResolver(args),
  },
};
