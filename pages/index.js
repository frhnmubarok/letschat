import Head from "next/head";
import Image from "next/image";
// import ws from 'ws';
import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import { MdLogin } from "react-icons/md";
import Chat from "../components/Chat";

import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from "@apollo/client/link/context";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import {
  Button,
  Col,
  Container,
  Loading,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";

export default function Home() {
  const [token, setToken] = useState("");
  const {
    isAuthenticated,
    user,
    loginWithRedirect,
    getIdTokenClaims,
    logout,
    isLoading,
  } = useAuth0();
  getIdTokenClaims().then((response) => {
    if (response) {
      setToken(response.__raw);
    }
    console.log(response);
  });
  console.log(isAuthenticated);

  const wsLink = process.browser
    ? new WebSocketLink({
        uri: process.env.NEXT_PUBLIC_GRAPHQL_WEBSOCKET,
        options: {
          reconnect: true,
          connectionParams: {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          },
        },
      })
    : null;

  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  });

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local cookie if it exists
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const splitLink = process.browser
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
          );
        },
        wsLink,
        httpLink
      )
    : httpLink;

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([authLink, splitLink]),
  });

  // if (isAuthenticated) return <Chat />;

  return (
    <ApolloProvider client={client}>
      {isAuthenticated ? (
        <div className="bg-slate-100">
          <Chat />
        </div>
      ) : (
        <div className="bgPattern">
          <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center text-center">
            {/* <button
            className='flex justify-center items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 transition-all ease-in-out duration-300 hover:scale-110'
            onClick={() => loginWithRedirect()}>
            <MdLogin className='mr-2' />
            Login
          </button> */}
            {isLoading ? (
              <Loading type="points-opacity" color={"primary"} size="xl" />
            ) : (
              <Container
                display="flex"
                direction="column"
                justify="center"
                alignItems="center"
                alignContent="center"
              >
                <Text
                  h1
                  size={60}
                  css={{
                    textGradient: "45deg, $blue500 -20%, $pink500 50%",
                  }}
                  weight="bold"
                >
                  LetsChat
                </Text>
                <Spacer y={1} />
                <Button
                  auto
                  className="shadow-lg"
                  color={"gradient"}
                  onClick={() => loginWithRedirect()}
                >
                  <MdLogin className="mr-2" />
                  Login
                </Button>
              </Container>
            )}
          </div>
        </div>
      )}
    </ApolloProvider>
  );
}
