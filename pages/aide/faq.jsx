import React from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
//import axios from 'axios';
import styles from '../../styles/Faq.module.css';
import { Container } from 'react-bootstrap';

function Faq() {
  return (
    <div>
      <NavBar pageType="devis" />

      <h1>FAQ</h1>
      <Container>
        <div className={styles.containerFaq}>
          <h1>FAQ</h1>
          <h1>FAQ</h1>
          <h1>FAQ</h1>
          <h1>FAQ</h1>
          <h1>FAQ</h1>
          <h1>FAQ</h1>
        </div>
      </Container>

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

export default Faq;
