import * as fs from "fs";
import getQuery from "schema/resolvers/getQuery";
import { getUserResolver } from "schema/resolvers/getUserResolver";
import { secured } from "schema/resolvers/secured";
import { userLoginResolver } from "schema/resolvers/userLoginResolver";
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
    userLogin: async (_, { email, password }) =>
      userLoginResolver(email, password),
  },
};
