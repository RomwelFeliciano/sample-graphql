import { gql } from "@apollo/client";

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
