import React from 'react';
import axios from 'axios';
import Head from 'next/head';
import { Container } from 'react-bootstrap';

import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';

import styles from '../../styles/Faq.module.css';

function Faq({ posts, headInfo }) {
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
      <h1 className={styles.h1Faq}>Foire aux questions</h1>
      <Container>
        {!posts ? (
          <p>Loading</p>
        ) : (
          <div className={styles.containerFaq}>
            <div className={styles.textFaq}>
              <div>
                {posts.map((itemMenu) => {
                  if (itemMenu.page_section === 'title') {
                    return (
                      <div key={itemMenu.position}>
                        <h5 className={styles.titleFaq} id={itemMenu.key} key={itemMenu.position}>
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
      </Container>

      <Footer pageType="devis" />
    </div>
  );
}
export async function getStaticProps() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const posts = await axios.get(`${apiUrl}/pagescontent/faq`).then((response) => response.data.filter((element) => element.visible === 1));
  const headInfo = await axios.get(`${apiUrl}/pagesdetails/faq`).then((response) => response.data);

  return {
    props: {
      posts,
      headInfo,
    },
  };
}

export default Faq;
