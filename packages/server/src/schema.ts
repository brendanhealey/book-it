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
`;
