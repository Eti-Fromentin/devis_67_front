import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LoginContextProvider } from '../contexts/loginContext';
import SSRProvider from 'react-bootstrap/SSRProvider';

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
