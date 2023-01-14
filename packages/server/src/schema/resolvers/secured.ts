import { readFileSync } from "fs";
// @ts-ignore
import { GraphQLError } from "graphql";

const jwt = require("jsonwebtoken");
const publicKey = readFileSync("./keys/public.key", "utf8");

const throwNotAuthError = () => {
  throw new GraphQLError("The client is not authenticated with the server", {
    extensions: {
      code: "UNAUTHENTICATED",
      http: {
        status: 401,
      },
    },
  });
};

export const secured = async (resolver, { accessToken }, args) => {
  if (!accessToken || accessToken.length === 0) {
    throwNotAuthError();
  }

  try {
    const accessTokenStripped = accessToken.replace("Bearer ", "");
    await jwt.verify(accessTokenStripped, publicKey, { algorithms: ["RS256"] });
    return resolver(args);
  } catch (err) {
    throwNotAuthError();
  }
};
