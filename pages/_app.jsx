import React from 'react';

import { LoginContextProvider } from '../contexts/loginContext';
import SSRProvider from 'react-bootstrap/SSRProvider';

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
