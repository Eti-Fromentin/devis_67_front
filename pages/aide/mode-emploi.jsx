import React from 'react';
import NavBar from '../../components/NavBar';
import styles from '../../styles/ModeEmploi.module.css';

import Footer from '../../components/Footer';
import axios from 'axios';

import { Container } from 'react-bootstrap';

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
              {
                posts
                  .filter((itemsMenu) => itemsMenu.page_section !== 'title')
                  .map((itemMenu) => {
                    return (
                      <div key={itemMenu.position} className={styles.textModeEmploi}>
                        <i className="fa fa-file-text-o"></i>
                        <p>{itemMenu.text}</p>
                      </div>
                    );
                  });
              }
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
    .then((data) => data.filter((element) => element.visible === 1 && element.page_name === 'modeEmploi'));

  return {
    props: {
      posts,
    },
  };
}

export default ModeEmploi;
