import db from "db";
import * as fs from "fs";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const publicKey = fs.readFileSync("./keys/public.key", "utf8");
const privateKey = fs.readFileSync("./keys/private.key", "utf8");

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
    getUser: async (_, { email }, { accessToken }) => {
      try {
        await jwt.verify(accessToken, publicKey, { algorithms: ["RS256"] });
        return true;
      } catch (err) {
        console.log("jwt didn't verify - need to return 401");
      }
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
      if (isMatched) {
        let newJwt;
        try {
          newJwt = jwt.sign({ userId: users[0].id }, privateKey, {
            expiresIn: 3600, // 1hr - msybe go for "90d"??
            algorithm: "RS256",
          });
        } catch (err) {
          console.log(err);
          console.log(
            "signing the new jwt didn't work - login failed return a 500"
          );
        }
        return {
          __typename: "UserLoginResponse",
          status: "success",
          jwt: newJwt,
        };
      } else {
        return {
          __typename: "UserLoginResponse",
          status: "failure",
        };
      }

      return {
        __typename: "UserLoginResponse",
        status: "success",
        jwt: "abc123",
      };
    },
  },
};
