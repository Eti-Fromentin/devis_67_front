import React from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import axios from 'axios';
import styles from '../../styles/MentionsLegales.module.css';

function MentionsLegales({ posts }) {
  return (
    <div>
      <NavBar pageType="devis" />
      <h1>Mentions legales</h1>
      <h2>Toutes les informations</h2>
      {!posts ? (
        <p>Loading</p>
      ) : (
        <div className={styles.containerMentionsLegales}>
          <div className={styles.textMentionsLegales}>
            {posts.map((itemMenu) => {
              if (itemMenu.page_section === 'title') {
                return (
                  <h5 className={styles.titleMentionsLegales} id={itemMenu.key} key={itemMenu.position}>
                    {itemMenu.text}
                  </h5>
                );
              } else if (itemMenu.page_section === 'text') {
                return (
                  <div key={itemMenu.position}>
                    <p className={styles.textMentionsLegales}>{itemMenu.text}</p>
                  </div>
                );
              }
            })}
          </div>
        </div>
      )}
      <Footer pageType="devis" />
    </div>
  );
}
export async function getStaticProps() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const posts = await axios
    .get(`${apiUrl}/pagescontent/mentions_legales`)
    .then((response) => response.data)
    .then((data) => data.filter((element) => element.visible === 1));

  return {
    props: {
      posts,
    },
  };
}

export default MentionsLegales;
