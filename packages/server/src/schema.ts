import mysql2 from "mysql2";

export const typeDefs = `#graphql
  type User {
    id: String
    email: String
    password: String
    name: String
  }

  type Query {
    users: [User]
  }

  type UserLoginResponse {
    status: String!
    jwt: String!
  }

  type Mutation {
    userLogin(email: String!, password: String!): UserLoginResponse!
  }
`;

const connection = mysql2.createConnection({
  host: "book-it.c37uza9ctf0v.eu-west-2.rds.amazonaws.com",
  user: "admin",
  password: "adminadmin",
  database: "book-it-schema",
});

function getQuery(sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (error, results) => {
      if (error) return reject(error);
      return resolve(results);
    });
  });
}

export const resolvers = {
  Query: {
    users: () => getQuery("SELECT * FROM `users`"),
  },
  Mutation: {
    userLogin: (_, { email, password }) => {
      console.log(email, password);
      return {
        __typename: "UserLoginResponse",
        status: "success",
        jwt: "abc123",
      };
    },
  },
};
