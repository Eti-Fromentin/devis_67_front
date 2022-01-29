import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { loginContextProvider } from '../contexts/loginContext';

function MyApp({ Component, pageProps }) {
  return (
    <loginContextProvider>
      <Component {...pageProps} />
    </loginContextProvider>
  );
}

export default MyApp;
