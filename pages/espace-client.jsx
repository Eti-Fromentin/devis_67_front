import React from 'react';
import NavBar from '../components/NavBar';
import Connexion from '../components/Connexion';

function EspaceClient() {
  return (
    <div>
      <NavBar pageType="devis" />
      <Connexion />
    </div>
  );
}

export default EspaceClient;
