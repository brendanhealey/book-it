import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import toast from "appContext/SnackbarUtils";
import store from "store";
import { fetchWithTimeout } from "./fetchWithTimeout";

/**
 * Build Apollo Client links.
 */
export const getLinks = (): ApolloLink[] => {
  // Configure the Authentication link which injects the authentication token into each request
  const authLink = setContext(async (_, { headers }) => {
    const accessToken = store.getState().securityStore.accessToken;
    return {
      headers: {
        ...headers,
        authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    };
  });

  // Log GraphQL errors
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (networkError) {
      console.error(`[GraphQL Network error]: ${networkError}`);
      toast.error(`[GraphQL Network error]: ${networkError}`);
    }
    if (graphQLErrors) {
      graphQLErrors.map(({ message, path }) =>
        console.warn(`[GraphQL error]: Message: ${message}, Path: ${path}`)
      );
      for (const err of graphQLErrors) {
        try {
          const { message } = err;
          const substr = message.substring(message.indexOf("[{"));
          const substrObj = JSON.parse(substr);
          toast.error(substrObj[0].message);
        } catch (e) {
          toast.error(err.message);
        }
        console.error(`[GraphQL error]: Message: ${err.message}`);
      }
    }
  });

  // Creates the HTTP link to the GraphQL API.
  const httpLink: ApolloLink = new HttpLink({
    uri: import.meta.env.VITE_GRAPHQL_API_URL,
    fetch: fetchWithTimeout,
  });

  // Aggregate links to set to the GraphQL client.
  // HttpLink must be the last one in the list as it's the terminating link
  return [errorLink, authLink, httpLink];
};

export const graphqlClient = new ApolloClient({
  cache: new InMemoryCache({ addTypename: false }),
  link: ApolloLink.from(getLinks()),
  connectToDevTools: true,
});
