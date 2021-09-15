import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';

export const favorites = makeVar([]);

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        favorites: {
          read: () => {
            return favorites();
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: 'http://13.212.13.38:4000',
  cache,
});

export default client;
