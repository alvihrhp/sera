// ApolloClient setup
import { ApolloClient, InMemoryCache } from "@apollo/client";

const url = process.env.REACT_APP_API_URL;

// Instantiate required constructor fields
const client = new ApolloClient({
  uri: url,
  cache: new InMemoryCache(),
  name: "graphql-pokemon-client",
  version: "1.0",
  queryDeduplication: false,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
  },
});

export default client;
