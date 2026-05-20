import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const DEFAULT_GRAPHQL_URL = 'http://127.0.0.1:4010/graphql';

export const getAdminConsoleGraphqlUrl = () =>
  import.meta.env.VITE_ADMIN_CONSOLE_GRAPHQL_URL ??
  import.meta.env.VITE_ADMIN_BFF_GRAPHQL_URL ??
  DEFAULT_GRAPHQL_URL;

export const adminConsoleApolloClient = new ApolloClient({
  link: new HttpLink({
    uri: getAdminConsoleGraphqlUrl(),
  }),
  cache: new InMemoryCache({
    typePolicies: {
      LocalizedMessage: {
        keyFields: false,
      },
    },
  }),
});
