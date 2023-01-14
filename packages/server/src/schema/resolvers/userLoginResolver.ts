import getQuery from "schema/resolvers/getQuery";
import { getUserSql } from "schema/resolvers/getUserResolver";
import * as fs from "fs";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const privateKey = fs.readFileSync("./keys/private.key", "utf8");

export const userLoginResolver = async (_, { email, password }) => {
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
};
