import getQuery from "gql/resolvers/getQuery";

export const getUserSql = "SELECT * FROM `users` WHERE email = ?";

export const getUserResolver = ({ email }) => getQuery(getUserSql, [email]);
