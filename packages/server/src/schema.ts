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

  type Mutation {
    userLogin(email: String, password: String): UserLoginResponse
  }

  type UserLoginResponse {
    status: String
    jwt: String
  }
`;
