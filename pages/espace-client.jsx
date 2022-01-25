import React from 'react';
import NavBar from '../components/NavBar';
// import Connexion from '../components/Connexion';
import UserProfile from './[user]';

function EspaceClient() {
  return (
    <div>
      <NavBar pageType="devis" />
      {/* <Connexion /> */}
      <UserProfile />
    </div>
  );
}

export default EspaceClient;
