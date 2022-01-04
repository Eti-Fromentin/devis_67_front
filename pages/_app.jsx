import React from 'react';
import 'uikit/dist/css/uikit.min.css';
import Connexion from './Connexion';
import Inscription from './Inscription';

function MyApp() {
  return (
    <>
    <div>
      <Connexion />
      <Inscription />
    </div>
    </>
  );
}

export default MyApp;
