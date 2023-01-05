export const typeDefs = `#graphql
  type User {
    id: User
    email: String
    password: String
    name: String
  }

  type Query {
    users: [User]
  }
`;
