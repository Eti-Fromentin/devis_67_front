import React, { useContext, useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Connexion from '../components/Connexion';
import UserProfile from '../components/UserProfile';
import loginContext from '../contexts/loginContext';



function EspaceClient() {

  const { isLogin } = useContext(loginContext);

  return (
    <div>
      <NavBar pageType="devis" />
      {isLogin === true ? <UserProfile /> : <Connexion />}
      <Footer pageType="devis" />
    </div>
  );
}

export default EspaceClient;
