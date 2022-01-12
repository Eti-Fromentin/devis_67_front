import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Inscription from '../components/Inscription';
// import Connexion from '../components/Connexion';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
