import { QueryGetUserArgs, User } from "gql/generated/resolverTypes";
import { getQueryOne } from "gql/resolvers/getQuery";

export const getUserSql = "SELECT * FROM `users` WHERE email = ?";

export const getUserResolver = ({ email }: QueryGetUserArgs) =>
  getQueryOne<User>(getUserSql, [email]);
