import Head from 'next/head';
import Image from 'next/image';
// import ws from 'ws';
import React, { useState } from 'react';
import styles from '../styles/Home.module.css';
import { useAuth0 } from '@auth0/auth0-react';
import { HiOutlineSearch } from 'react-icons/hi';
import Chat from '../components/Chat';

import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { setContext } from '@apollo/client/link/context';
import { ApolloClient, InMemoryCache, ApolloProvider, split, HttpLink, ApolloLink } from '@apollo/client';

export default function Home() {
  const [token, setToken] = useState('');
  const { isAuthenticated, user, loginWithRedirect, getIdTokenClaims, logout, isLoading } = useAuth0();
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
              Authorization: token ? `Bearer ${token}` : '',
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
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const splitLink = process.browser
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
        },
        wsLink,
        httpLink,
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
        <Chat />
      ) : (
        <div className='max-w-5xl mx-auto text-center flex flex-col'>
          <button onClick={() => loginWithRedirect()}>Login</button>
          {isAuthenticated && <button onClick={() => logout()}>Logout</button>}
        </div>
      )}
    </ApolloProvider>
  );
}
