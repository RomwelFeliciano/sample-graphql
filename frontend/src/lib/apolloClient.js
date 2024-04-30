import { ApolloClient, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { cache } from "./cache";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message }) => {
      alert(`GraphQL error ${message}`);
    });
  }
  if (networkError) {
    console.log(`Network error: ${networkError}`);
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:4000/graphql" }),
]);

export const client = new ApolloClient({
  link: link,
  cache,
});
