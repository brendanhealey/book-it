import db from "db";
import * as fs from "fs";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const publicKey = fs.readFileSync("./keys/public.key", "utf8");

// this is one way of doing it
async function getQuery(sql: string, values: any) {
  const [rows] = await db.promise().execute(sql, values);
  return rows;
}

// and this is another
const getQuery2 = (sql: string, values: any) => {
  return new Promise((resolve, reject) => {
    db.execute(sql, values, (error, results) => {
      if (error) return reject(error);
      return resolve(results);
    });
  });
};

const getUserSql = "SELECT * FROM `users` WHERE email = ?";

export const resolvers = {
  Query: {
    getUser: (_, { email }, { accessToken }) => {
      return getQuery(getUserSql, [email]);
    },
  },
  Mutation: {
    userLogin: async (_, { email, password }) => {
      console.log(email, password);
      const users = await getQuery(getUserSql, [email]);
      // check user isn't empty
      console.log(users);
      const isMatched = await bcrypt.compare(password, users[0].password);
      console.log("match", isMatched);
      return {
        __typename: "UserLoginResponse",
        status: "success",
        jwt: "abc123",
      };
    },
  },
};
