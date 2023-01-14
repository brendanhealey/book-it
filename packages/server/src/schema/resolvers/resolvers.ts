import * as fs from "fs";
import getQuery from "schema/resolvers/getQuery";
import { getUserResolver } from "schema/resolvers/getUserResolver";
import { secured } from "schema/resolvers/secured";
import { ServerContext } from "server";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const privateKey = fs.readFileSync("./keys/private.key", "utf8");

const getUserSql = "SELECT * FROM `users` WHERE email = ?";

export const resolvers = {
  Query: {
    getUser: async (_, args, context: ServerContext) =>
      secured(getUserResolver, context, args),
  },
  Mutation: {
    userLogin: async (_, { email, password }) => {
      console.log(email, password);
      const users = await getQuery(getUserSql, [email]);
      // check user isn't empty - array length 1
      console.log(users);
      const isMatched = await bcrypt.compare(password, users[0].password);
      console.log("match", isMatched);
      if (isMatched) {
        let newJwt: String;
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
