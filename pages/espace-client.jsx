import React, { useContext, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Connexion from '../components/Connexion';
import UserProfile from '../components/UserProfile';
import LoginContext from '../contexts/loginContext';
import Inscription from '../components/Inscription';

function EspaceClient() {
  const { isLogin, checkIsLogin } = useContext(LoginContext);

  useEffect(() => {
    checkIsLogin();
  }, []);

  return (
    <div>
      <NavBar pageType="devis" />
      {isLogin === true ? (
        <UserProfile />
      ) : (
        <>
          <Connexion /> <Inscription />
        </>
      )}
      <Footer pageType="devis" />
    </div>
  );
}

export default EspaceClient;
