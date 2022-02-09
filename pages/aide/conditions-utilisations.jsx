import React from 'react';

import axios from 'axios';
import Head from 'next/head';

import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';

import styles from '../../styles/Conditions.module.css';

function ConditionsUtilisations({ posts, headInfo }) {
  const head = headInfo && headInfo[0];
  return (
    <div>
      <Head>
        <title>{head.title}</title>
        <meta name="description" content={head.description} />
        <meta name="keywords" content={head.keywords} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div>
        <NavBar pageType="devis" />
        <h1 id={styles.headingConditions}>Conditions d&apos;utilisations</h1>
        {!posts ? (
          <p>Loading</p>
        ) : (
          <div className={styles.containerConditions}>
            <div className={styles.textConditions}>
              <ol>
                {posts
                  .filter((itemsMenu) => itemsMenu.page_section === 'chapterTitle')
                  .map((itemMenu) => {
                    return (
                      <li className={styles.itemsMenu} key={itemMenu.key}>
                        <a href={`#${itemMenu.text}`} className={styles.linkConditions}>
                          {itemMenu.text}
                        </a>
                      </li>
                    );
                  })}
              </ol>
              <div>
                {posts.map((itemMenu) => {
                  if (itemMenu.page_section === 'chapterTitle') {
                    return (
                      <div key={itemMenu.position}>
                        <h5 className={styles.titleConditions} id={itemMenu.text} key={itemMenu.position}>
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
                })}
              </div>
            </div>
          </div>
        )}
        <Footer pageType="devis" />
      </div>
    </div>
  );
}
export async function getStaticProps() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const posts = await axios.get(`${apiUrl}/pagescontent/conditions`).then((response) => response.data.filter((element) => element.visible === 1));
  const headInfo = await axios.get(`${apiUrl}/pagesdetails/conditions-utilisations`).then((response) => response.data);
  return {
    props: {
      posts,
      headInfo,
    },
  };
}

export default ConditionsUtilisations;
