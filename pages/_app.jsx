import React from 'react';
import LayOut from '../components/LayOut';

import '../styles/globals.css';
import 'uikit/dist/css/uikit.min.css';

function MyApp({ Component, pageProps }) {
  return (
    <LayOut>
      <Component {...pageProps} />;
    </LayOut>
  );
}

export default MyApp;
