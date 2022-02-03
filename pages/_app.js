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
      domain={process.env.NEXT_PUBLIC_AUTH_DOMAIN}
      clientId={process.env.NEXT_PUBLIC_AUTH_CLIENTID}
      redirectUri={process.env.NEXT_PUBLIC_BASE_URL}
      scope='read:current_user update:current_user_metadata'>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </Auth0Provider>
  );
}

export default MyApp;
