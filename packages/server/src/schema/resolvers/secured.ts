import { readFileSync } from "fs";

const jwt = require("jsonwebtoken");
const publicKey = readFileSync("./keys/public.key", "utf8");

export const secured = async (resolver, { accessToken }, args) => {
  console.log("accessToken", accessToken);
  if (!accessToken || accessToken.length === 0) {
    throw new Error("no access token present");
  }

  try {
    const accessTokenStripped = accessToken.replace("Bearer ", "");
    await jwt.verify(accessTokenStripped, publicKey, { algorithms: ["RS256"] });
    return resolver(args);
  } catch (err) {
    // return a 401
    throw new Error(err.message);
  }
};
