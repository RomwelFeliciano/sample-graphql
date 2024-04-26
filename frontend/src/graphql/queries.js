import { gql } from "@apollo/client";

// ALL USERS
export const GET_ALL_USERS = gql`
  query {
    getUsers {
      id
      name
      age
      job
    }
  }
`;

// ALL POSTS
export const GET_ALL_POSTS = gql`
  query {
    getPosts {
      id
      title
      content
      user_id
    }
  }
`;

// SPECIFIC POST WITH COMMENTS
export const GET_POST_WITH_COMMENTS = gql`
  query ($postID: ID!) {
    getPost(id: $postID) {
      title
      content
      comments {
        id
        content
        user_id
        post_id
      }
    }
  }
`;
