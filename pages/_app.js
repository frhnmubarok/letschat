import { Auth0Provider } from '@auth0/auth0-react';
import '../styles/globals.css';

import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { setContext } from '@apollo/client/link/context';
import { ApolloClient, InMemoryCache, ApolloProvider, split, HttpLink, ApolloLink } from '@apollo/client';
import { useState } from 'react/cjs/react.production.min';
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }) {
  return (
    <Auth0Provider
      domain='dev-jt318qxr.us.auth0.com'
      clientId='2ASh80PYVY32RUbRcpoMzXX7LADzj9BX'
      redirectUri='http://localhost:3000'
      scope='read:current_user update:current_user_metadata'>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </Auth0Provider>
  );
}

export default MyApp;
