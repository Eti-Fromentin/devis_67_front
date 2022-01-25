import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
//import axios from 'axios';
import styles from '../styles/TopDevis.modules.css';
//import { Container } from 'react-bootstrap';

function TopDevis() {
  return (
    <div>
      <NavBar pageType="devis" />
      <h1>Top devis</h1>
      <p>Text à changer</p>
      <div className={styles.containerTopDevis}>
        <h1>Top Devis</h1>
        <h1>Top Devis</h1>
        <h1>Top Devis</h1>
        <h1>Top Devis</h1>
        <h1>Top Devis</h1>
      </div>
      <Footer pageType="devis" />
    </div>
  );
}
// export async function getStaticProps() {
//   const posts = await axios
//     .get('http://localhost:8000/api/pagescontent')
//     .then((response) => response.data)
//     .then((data) => data.filter((element) => element.visible === 1 && element.page_name === 'modeEmploi'));

//   return {
//     props: {
//       posts,
//     },
//   };
// }

export default TopDevis;
