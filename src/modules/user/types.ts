export const UserTypes = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
    picture: String
    createdAt: String!
  }

  input CreateUserInput {
    name: String!
    email: String!
    password: String!
  }

  input UpdateUserInput {
    name: String
    email: String
    picture: String
  }

  input LoginUserInput {
    email: String!
    password: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    me: User
  }

  type Mutation {
    signUp(input: CreateUserInput!): AuthPayload
    login(input: LoginUserInput!): AuthPayload
    updateUser(input: UpdateUserInput!): User
  }

`;
