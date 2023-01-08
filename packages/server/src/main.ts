import { ApolloServer } from "@apollo/server";
import { startServerAndCreateLambdaHandler } from "@as-integrations/aws-lambda";
import { typeDefs } from "schema";
import mysql2 from "mysql2";

const connection = mysql2.createConnection({
  host: "book-it.c37uza9ctf0v.eu-west-2.rds.amazonaws.com",
  user: "admin",
  password: "adminadmin",
  database: "book-it-schema",
});

const resolvers = {
  Query: {
    users: () => getQuery("SELECT * FROM `users`"),
  },
};

function getQuery(sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (error, results) => {
      if (error) return reject(error);
      return resolve(results);
    });
  });
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

export const graphqlHandler = startServerAndCreateLambdaHandler(server);
