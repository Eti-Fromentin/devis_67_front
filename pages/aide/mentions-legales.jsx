import React from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import axios from 'axios';
import styles from '../../styles/MentionsLegales.module.css';
//import { Container } from 'react-bootstrap';

function MentionsLegales({ posts }) {
  return (
    <div>
      <NavBar pageType="devis" />
      {posts
        .filter((titlesMenu) => titlesMenu.page_section === 'chapterTitle')
        .map((titleMenu) => {
          return (
            <div key={titleMenu.id}>
              <h5 key={titleMenu.id} className={styles.titleMentionsLegales}>
                {titleMenu.text}
              </h5>
            </div>
          );
        })}

      {!posts ? (
        <p>Loading</p>
      ) : (
        <div className={styles.containerMentionsLegales}>
          {posts.map((itemMenu) => {
            if (itemMenu.page_section === 'title') {
              return (
                <h5 className={styles.titleMentionsLegales} key={itemMenu.position}>
                  {itemMenu.text}
                </h5>
              );
            } else if (itemMenu.page_section === 'text') {
              return <p className={styles.textMentionsLegales}>{itemMenu.text}</p>;
            }
          })}
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
    .then((data) => data.filter((element) => element.visible === 1 && element.page_name === 'mentions_legales'));

  return {
    props: {
      posts,
    },
  };
}

export default MentionsLegales;
