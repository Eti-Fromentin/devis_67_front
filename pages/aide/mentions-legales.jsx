import React from 'react';
import axios from 'axios';
import Head from 'next/head';

import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';

import styles from '../../styles/MentionsLegales.module.css';

function MentionsLegales({ posts, headInfo }) {
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
      <h1 className={styles.h1MentionsLégales}>Mentions legales</h1>
      <h2 className={styles.h2MentionsLégales}>Toutes les informations :</h2>
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
  const headInfo = await axios.get(`${apiUrl}/pagesdetails/mentions-légales`).then((response) => response.data);

  return {
    props: {
      posts,
      headInfo,
    },
  };
}

export default MentionsLegales;
