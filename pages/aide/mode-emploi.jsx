import React from 'react';
import NavBar from '../../components/NavBar';
import styles from '../../styles/ModeEmploi.module.css';

import axios from 'axios';

import { Container } from 'react-bootstrap';

function ModeEmploi({ posts }) {
  return (
    <div>
      <NavBar pageType="devis" />
      <h1 className={styles.h1ModeEmploi}>Mode d emploi</h1>
      {!posts ? (
        <p>Loading</p>
      ) : (
        <div className={styles.containerModeEmploi}>
          <ol className={styles.containerUlModeEmploi}>
            {posts
              .filter((itemsMenu) => itemsMenu.page_section === 'chapterTitle')
              .map((itemMenu) => (
                <li className={styles.itemsMenuModeEmploi} key={itemMenu.key}>
                  {itemMenu.text}
                </li>
              ))}
          </ol>
          {/* BAR */}
          <div className={styles.barModeEmploi}></div>
          <Container className={styles.containerItemMenuModeEmploi}>
            {posts.map((itemMenu) => {
              if (itemMenu.page_section === 'chapterTitle') {
                return <h5 key={itemMenu.key}>{itemMenu.text}</h5>;
              } else if (itemMenu.page_section === 'text') {
                return <p>{itemMenu.text}</p>;
              }
            })}
          </Container>
        </div>
      )}
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

export default ModeEmploi;
