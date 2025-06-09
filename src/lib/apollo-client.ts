import { ApolloClient, InMemoryCache, HttpLink,NormalizedCacheObject } from '@apollo/client';

let client: ApolloClient<NormalizedCacheObject> | null = null;

export const getClient = () => {
  // Create a new client if there's no existing one
  // or if we're on the server
  if (!client || typeof window === 'undefined') {
    client = new ApolloClient({
      link: new HttpLink({
        uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || '/api/graphql',
      }),
      cache: new InMemoryCache(),
      defaultOptions: {
        query: {
          fetchPolicy: 'network-only',
        },
        watchQuery: {
          fetchPolicy: 'network-only',
        },
      },
    });
  }

  return client;
};
