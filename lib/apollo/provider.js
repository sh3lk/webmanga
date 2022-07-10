import {
    ApolloClient,
    ApolloLink,
    InMemoryCache,
    HttpLink,
} from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import { useMemo } from "react";
import { useSession } from "next-auth/react";
const httpLink = new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
});

const authLink = (accessToken) =>
    new ApolloLink((operation, forward) => {
        operation.setContext({
            headers: accessToken
                ? {
                    Authorization: `Bearer ${accessToken}`,
                }
                : {},
        });

        return forward(operation);
    });

function Provider({ children }) {
    const cache = useMemo(() => new InMemoryCache(), []);
    const { data } = useSession();
    const { accessToken } = data ?? {};

    const client = useMemo(
        () =>
            new ApolloClient({
                link: authLink(accessToken).concat(httpLink),
                cache,
            }),
        [accessToken]
    );

    return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default Provider;
