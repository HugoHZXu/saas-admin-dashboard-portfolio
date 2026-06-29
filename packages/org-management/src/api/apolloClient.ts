import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, Observable } from '@apollo/client';
import { getCurrentOrRefreshIdentityAccessToken } from 'admin-shared';

const DEFAULT_GRAPHQL_URL = 'http://127.0.0.1:4010/graphql';

export const getOrgManagementGraphqlUrl = () =>
  import.meta.env.VITE_ORG_MANAGEMENT_GRAPHQL_URL ??
  import.meta.env.VITE_ADMIN_BFF_GRAPHQL_URL ??
  DEFAULT_GRAPHQL_URL;

export const createIdentityAuthLink = () =>
  new ApolloLink((operation, forward) => {
    return new Observable((observer) => {
      let subscription: { unsubscribe: () => void } | undefined;

      void getCurrentOrRefreshIdentityAccessToken()
        .then((accessToken) => {
          operation.setContext(({ headers = {} }) => ({
            headers: {
              ...headers,
              ...(accessToken ? { authorization: `Bearer ${accessToken}` } : {}),
            },
          }));

          subscription = forward(operation).subscribe(observer);
        })
        .catch((error: unknown) => observer.error(error));

      return () => subscription?.unsubscribe();
    });
  });

export const orgManagementApolloClient = new ApolloClient({
  link: createIdentityAuthLink().concat(
    new HttpLink({
      uri: getOrgManagementGraphqlUrl(),
    })
  ),
  cache: new InMemoryCache({
    typePolicies: {
      LocalizedMessage: {
        keyFields: false,
      },
    },
  }),
});
