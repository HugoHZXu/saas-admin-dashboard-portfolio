import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const DEFAULT_GRAPHQL_URL = 'http://127.0.0.1:4010/graphql';

export const getOrgManagementGraphqlUrl = () =>
  import.meta.env.VITE_ORG_MANAGEMENT_GRAPHQL_URL ?? DEFAULT_GRAPHQL_URL;

export const orgManagementApolloClient = new ApolloClient({
  link: new HttpLink({
    uri: getOrgManagementGraphqlUrl(),
  }),
  cache: new InMemoryCache(),
});
