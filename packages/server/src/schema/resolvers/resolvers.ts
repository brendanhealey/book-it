import db from "db";

// this is one way of doing it
const getQuery = async (sql: string) => {
  const [rows] = await db.promise().query(sql);
  return rows;
};

// and this is another
const getQuery2 = (sql: string) => {
  return new Promise((resolve, reject) => {
    db.query(sql, (error, results) => {
      if (error) return reject(error);
      return resolve(results);
    });
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
