import React from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import axios from 'axios';
import styles from '../../styles/ModeEmploi.module.css';

//import { Container } from 'react-bootstrap';

function ModeEmploi({ posts }) {
  return (
    <div>
      <NavBar pageType="devis" />
      {posts
        .filter((titlesMenu) => titlesMenu.page_section === 'title')
        .map((titleMenu) => {
          return (
            <div key={titleMenu.id}>
              <h5 key={titleMenu.id} className={styles.titleModeEmploi}>
                {titleMenu.text}
              </h5>
            </div>
          );
        })}

      {!posts ? (
        <p>Loading</p>
      ) : (
        <div className={styles.containerModeEmploi}>
          {posts
            .filter((itemsMenu) => itemsMenu.page_section !== 'title')
            .map((itemMenu) => {
              return (
                <div key={itemMenu.position} className={styles.textModeEmploi}>
                  <p>{itemMenu.text}</p>
                </div>
              );
            })}
        </div>
      )}
      <Footer pageType="devis" />
    </div>
  );
}
export async function getStaticProps() {
  const posts = await axios
    .get('http://localhost:8000/api/pagescontent/modeEmploi')
    .then((response) => response.data)
    .then((data) => data.filter((element) => element.visible === 1));

  return {
    props: {
      posts,
    },
  };
}

export default ModeEmploi;
