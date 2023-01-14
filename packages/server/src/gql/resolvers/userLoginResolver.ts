import { getQueryMany, getQueryOne } from "gql/resolvers/getQuery";
import { getUserSql } from "gql/resolvers/getUserResolver";
import * as fs from "fs";
// @ts-ignore
import { GraphQLError } from "graphql";
import {
  MutationUserLoginArgs,
  StatusType,
  User,
  UserLoginResponse,
} from "gql/generated/resolverTypes";
import constants from "constants/serverConstants";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const privateKey = fs.readFileSync("./keys/private.key", "utf8");

export const userLoginResolver = async ({
  email,
  password,
}: MutationUserLoginArgs): Promise<UserLoginResponse> => {
  const user = await getQueryOne<User>(getUserSql, [email]);
  if (!user) {
    throw new GraphQLError("The email could not be found", {
      extensions: {
        code: "INTERNAL_SERVER_ERROR",
      },
    });
  }

  const isMatched = await bcrypt.compare(password, user.password);
  if (isMatched) {
    let newJwt: string;
    try {
      newJwt = jwt.sign({ userId: user.id }, privateKey, {
        expiresIn: constants.SECURITY_ACCESS_TOKEN_LIFETIME,
        algorithm: constants.SECURITY_RSA_ALGORITHM,
      });
      return {
        __typename: "UserLoginResponse",
        status: StatusType.Success,
        jwt: newJwt,
      };
    } catch (err) {
      throw new GraphQLError("The server could not generate an access token", {
        extensions: {
          code: "INTERNAL_SERVER_ERROR",
        },
      });
    }
  } else {
    return {
      __typename: "UserLoginResponse",
      status: StatusType.Failure,
    };
  }
};
