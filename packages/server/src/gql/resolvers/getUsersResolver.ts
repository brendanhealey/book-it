import { User } from "gql/generated/resolverTypes";
import { getQueryMany } from "gql/resolvers/getQuery";

export const getUsersSql = "SELECT * FROM `users`";

export const getUsersResolver = () => getQueryMany<User[]>(getUsersSql);
