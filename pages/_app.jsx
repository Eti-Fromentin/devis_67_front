import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LoginContextProvider } from '../contexts/loginContext';

function MyApp({ Component, pageProps }) {
  return (
    <LoginContextProvider>
      <Component {...pageProps} />
    </LoginContextProvider>
  );
}

export default MyApp;
