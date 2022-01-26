import React from 'react';
import NavBar from '../components/NavBar';
import Connexion from '../components/Connexion';
import Footer from '../components/Footer';



function EspaceClient() {
  return (
    <div>
      <NavBar pageType="devis" />

      <Connexion />
      <Footer pageType="devis" />

    </div>
  );
}

export default EspaceClient;
