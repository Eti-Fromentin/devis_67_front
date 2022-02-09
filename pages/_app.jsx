import React from 'react';

import SSRProvider from 'react-bootstrap/SSRProvider';

import { LoginContextProvider } from '../contexts/loginContext';

import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
      <LoginContextProvider>
        <Component {...pageProps} />
      </LoginContextProvider>
    </SSRProvider>
  );
}

export default MyApp;
