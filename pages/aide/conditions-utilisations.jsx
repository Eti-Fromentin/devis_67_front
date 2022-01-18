import React from 'react';
import axios from 'axios';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import styles from '../../styles/Conditions.module.css';
import { Container } from 'react-bootstrap';

function ConditionsUtilisations({ posts }) {
  return (
    <div>
      <NavBar pageType="devis" />
      <h1>Conditions d utilisations</h1>
      {!posts ? (
        <p>Loading</p>
      ) : (
        <div>
          <ul>
            {posts
              .filter((itemsMenu) => itemsMenu.page_section === 'chapterTitle')
              .map((itemMenu) => (
                <li className={styles.itemsMenu} key={itemMenu.key}>
                  {itemMenu.text}
                </li>
              ))}
          </ul>
          <Container>
            {posts.map((itemMenu) => {
              if (itemMenu.page_section === 'chapterTitle') {
                return (
                  <div key={itemMenu.position}>
                    <h5 className={styles.titleConditions} key={itemMenu.position}>
                      {itemMenu.text}
                    </h5>
                  </div>
                );
              } else if (itemMenu.page_section === 'text') {
                return (
                  <div key={itemMenu.position}>
                    <p className={styles.textConditions}>{itemMenu.text}</p>
                  </div>
                );
              }
              //}
              //}
            })}
          </Container>
        </div>
      )}
      <Footer pageType="devis" />
    </div>
  );
}
export async function getStaticProps() {
  const posts = await axios
    .get('http://localhost:8000/api/pagescontent')
    .then((response) => response.data)
    .then((data) => data.filter((element) => element.visible === 1));

  return {
    props: {
      posts,
    },
  };
}

export default ConditionsUtilisations;
