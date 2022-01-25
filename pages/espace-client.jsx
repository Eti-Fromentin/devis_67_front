import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
// import Connexion from '../components/Connexion';
import UserProfile from './[user]';

function EspaceClient() {
  return (
    <div>
      <NavBar pageType="devis" />
      {/* <Connexion /> */}
      <UserProfile />
      <Footer pageType="devis" />
    </div>
  );
}

export default EspaceClient;
