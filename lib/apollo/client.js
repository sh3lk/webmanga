import { ApolloClient, InMemoryCache } from "@apollo/client";

const getApolloClient = (options = {}) =>
        new ApolloClient({
            uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
            ssrMode: typeof window === 'undefined',
            cache: new InMemoryCache(),
            ...options
        });

export default getApolloClient;
