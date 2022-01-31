import React from 'react';
import Head from 'next/head';
import axios from 'axios';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import Renseignement from '../components/Renseignement';

function Contact({ headInfo }) {
  const head = headInfo && headInfo[0];
  return (
    <div>
      <Head>
        <title>{head.title}</title>
        <meta name="description" content={head.description} />
        <meta name="keywords" content={head.keywords} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NavBar pageType="devis" />
      <Renseignement />
      <Footer pageType="devis" />
    </div>
  );
}
export async function getStaticProps() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const headInfo = await axios.get(`${apiUrl}/pagesdetails/contact`).then((response) => response.data);

  return {
    props: {
      headInfo,
    },
  };
}

export default Contact;
