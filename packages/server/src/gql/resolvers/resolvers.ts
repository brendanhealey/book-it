import { Resolvers } from "gql/generated/resolverTypes";
import { getUserResolver } from "gql/resolvers/getUserResolver";
import { secured } from "gql/resolvers/secured";
import { userLoginResolver } from "gql/resolvers/userLoginResolver";
import { IServerContext } from "server";

export const resolvers: Resolvers = {
  Query: {
    getUser: async (_, args, context: IServerContext) =>
      secured(getUserResolver, context, args),
    // getUserResolver(args),
  },
  Mutation: {
    userLogin: async (_, args) => userLoginResolver(args),
  },
};
