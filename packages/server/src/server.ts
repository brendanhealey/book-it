import { ApolloServer } from "@apollo/server";
// @ts-ignore
import { expressMiddleware } from "@apollo/server/express4";
// @ts-ignore
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
// @ts-ignore
import express from "express";
import http from "http";
// @ts-ignore
import cors from "cors";
// @ts-ignore
import bodyParser from "body-parser";
import { typeDefs, resolvers } from "./schema";

export interface ServerContext {
  accessToken: String;
}

// work around the error:
// await is only valid in async functions and the top level bodies of modules
(async () => {
  // Required logic for integrating with Express
  const app = express();
  // Our httpServer handles incoming requests to our Express app.
  // Below, we tell Apollo Server to "drain" this httpServer,
  // enabling our servers to shut down gracefully.
  const httpServer = http.createServer(app);

  // Same ApolloServer initialization as before, plus the drain plugin
  // for our httpServer.
  const server = new ApolloServer<ServerContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  // Ensure we wait for our server to start
  await server.start();

  // Set up our Express middleware to handle CORS, body parsing,
  // and our expressMiddleware function.
  app.use(
    "/",
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    // expressMiddleware accepts the same arguments:
    // an Apollo Server instance and optional configuration options
    expressMiddleware(server, {
      context: async ({ req }) => ({ accessToken: req.headers.authorization }),
    })
  );

  // Modified server startup
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );

  console.log(`🚀 Server ready at http://localhost:4000/`);
})();
