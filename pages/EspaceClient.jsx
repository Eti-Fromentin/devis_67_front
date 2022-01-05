import React from 'react';

import Inscription from '../components/Inscription';
import Connexion from '../components/Connexion';

import 'uikit/dist/css/uikit.min.css';

export default function EspaceClient() {
  return (
    <div className="uk-flex uk-flex-center">
      <Connexion />
      <Inscription />
    </div>
  );
}
