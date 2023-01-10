import db from "db";

const getQuery = async (sql) => {
  db.query(sql, (error, results) => {
    if (error) return error;
    return results;
  });
};

export const resolvers = {
  Query: {
    getUsers: () => getQuery("SELECT * FROM `users`"),
  },
  Mutation: {
    userLogin: (_, { email, password }) => {
      console.log(email, password);
      return {
        __typename: "UserLoginResponse",
        status: "success",
        jwt: "abc123",
      };
    },
  },
};
