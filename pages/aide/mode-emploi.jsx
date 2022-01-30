import React from 'react';
import NavBar from '../../components/NavBar';
import styles from '../../styles/ModeEmploi.module.css';

import Footer from '../../components/Footer';
import axios from 'axios';

function ModeEmploi({ posts }) {
  return (
    <div>
      <NavBar pageType="devis" />
      <h1 className={styles.h1ModeEmploi}>Mode d emploi</h1>
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
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const posts = await axios
    .get(`${apiUrl}/pagescontent/modeEmploi`)
    .then((response) => response.data)
    .then((data) => data.filter((element) => element.visible === 1));

  return {
    props: {
      posts,
    },
  };
}

export default ModeEmploi;
