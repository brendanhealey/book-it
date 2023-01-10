export const typeDefs = `#graphql

  type User {
    id: String
    email: String
    password: String
    name: String
  }

  type Query {
    getUsers: [User]
  }

  type UserLoginResponse {
    status: String!
    jwt: String!
  }

  type Mutation {
    userLogin(email: String!, password: String!): UserLoginResponse!
  }
`;
