import React, { useContext } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Connexion from '../components/Connexion';
import UserProfile from './[user]';
import loginContext from '../contexts/loginContext';

function EspaceClient() {
  const { isLogin } = useContext(loginContext);
  const loggedin = localStorage.getItem('AccessToken');
  {
    loggedin ? isLogin === true : isLogin === false;
  }
  return (
    <div>
      <NavBar pageType="devis" />
      {isLogin && isLogin === true ? <UserProfile /> : <Connexion />}
      {/* <Connexion /> */}
      <Footer pageType="devis" />
    </div>
  );
}

export default EspaceClient;
