import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Connexion from '../components/Connexion';
import UserProfile from '../components/UserProfile';
import Inscription from '../components/Inscription';
import LoginContext from '../contexts/loginContext';

function EspaceClient({ headInfo }) {
  const head = headInfo && headInfo[0];
  const { isLogin, checkIsLogin } = useContext(LoginContext);

  useEffect(() => {
    checkIsLogin();
  }, []);

  return (
    <div>
      <Head>
        <title>{head.title}</title>
        <meta name="description" content={head.description} />
        <meta name="keywords" content={head.keywords} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
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
export async function getStaticProps() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const headInfo = await axios.get(`${apiUrl}/pagesdetails/espace-client`).then((response) => response.data);

  return {
    props: {
      headInfo,
    },
  };
}

export default EspaceClient;
