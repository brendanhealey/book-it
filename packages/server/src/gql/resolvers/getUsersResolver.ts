import { User } from "gql/generated/typedefs";
import { getQueryMany } from "gql/resolvers/getQuery";

export const getUsersSql = "SELECT * FROM `users`";

export const getUsersResolver = () => getQueryMany<User[]>(getUsersSql);
