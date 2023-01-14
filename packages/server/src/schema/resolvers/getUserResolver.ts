import getQuery from "schema/resolvers/getQuery";

export const getUserSql = "SELECT * FROM `users` WHERE email = ?";

export const getUserResolver = ({ email }) => {
  return getQuery(getUserSql, [email]);
};
