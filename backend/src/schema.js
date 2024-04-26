const { gql } = require("apollo-server-express");

// Set up GraphQL Schema
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    age: Int!
    job: String
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    author: [User!]!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    content: String!
    user_id: ID!
    post_id: ID!
  }

  type Query {
    getUsers: [User!]!
    getPosts: [Post!]!
    getComments: [Comment!]!
    getUser(id: ID!): User
    getPost(id: ID!): Post
    getComment(id: ID!): Comment
  }
`;

module.exports = typeDefs;
