import React from 'react';
import axios from 'axios';

import Head from 'next/head';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';

import styles from '../../styles/ModeEmploi.module.css';

function ModeEmploi({ posts, headInfo }) {
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
      <h1 className={styles.h1ModeEmploi}>Mode d emploi</h1>
      {posts
        .filter((titlesMenu) => titlesMenu.page_section === 'title')
        .map((titleMenu) => {
          return (
            <div key={titleMenu.id} className={styles.containerTitleModeEmploi}>
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
  const headInfo = await axios.get(`${apiUrl}/pagesdetails/mode-emploi`).then((response) => response.data);

  return {
    props: {
      posts,
      headInfo,
    },
  };
}

export default ModeEmploi;
