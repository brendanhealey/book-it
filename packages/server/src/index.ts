import { ApolloServer } from "@apollo/server";
// import { startStandaloneServer } from "@apollo/server/standalone";
import { startServerAndCreateLambdaHandler } from "@as-integrations/aws-lambda";

const typeDefs = `#graphql
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;

const books = [
  {
    title: "The Awakening 2",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

const resolvers = {
  Query: {
    books: () => books,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// const { url } = await startStandaloneServer(server, {
//   listen: { port: 4000 },
// });
// console.log(`🚀  Server ready at: ${url}`);

export const graphqlHandler = startServerAndCreateLambdaHandler(server);
