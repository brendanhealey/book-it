export const typeDefs = `#graphql

  type User {
    id: String
    email: String
    password: String
    name: String
  }

  type Query {
    getUser(email: String): [User]
  }

  type Mutation {
    userLogin(email: String, password: String): UserLoginResponse
  }

  type UserLoginResponse {
    status: StatusType
    jwt: String
  }

  enum StatusType {
    success
    failure
  }
  `;
