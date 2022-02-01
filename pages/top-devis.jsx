import React from 'react';
import axios from 'axios';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

import { Nav } from 'react-bootstrap';

import styles from '../styles/TopDevis.module.css';

function TopDevis({ posts }) {
  return (
    <div>
      <NavBar pageType="devis" />
      {posts
        .filter((titlesMenu) => titlesMenu.page_section === 'chaperTitle' && titlesMenu.page_name === 'top-devis')
        .map((titleMenu) => {
          return (
            <div key={titleMenu.id}>
              <h5 key={titleMenu.id} className={styles.titleTopDevis}>
                {titleMenu.text}
              </h5>
            </div>
          );
        })}

      {!posts ? (
        <p>Loading</p>
      ) : (
        <div className={styles.containerTopDevis}>
          <div className={styles.textTopDevis}>
            {posts
              .filter((itemsMenu) => itemsMenu.page_section !== 'chaperTitle' && itemsMenu.position < 10 && itemsMenu.page_name === 'top-devis')
              .map((itemMenu) => {
                if (itemMenu.page_section === 'lien') {
                  return (
                    <div key={itemMenu.position}>
                      <Nav.Link href={itemMenu.pages.url} className={styles.linkTopDevis}>
                        {itemMenu.text}
                      </Nav.Link>
                    </div>
                  );
                } else {
                  return <p key={itemMenu.position}>{itemMenu.text}</p>;
                }
              })}
          </div>
          <div className={styles.textTopDevis}>
            {posts
              .filter((itemsMenu) => itemsMenu.page_section !== 'chaperTitle' && itemsMenu.page_name === 'faq')
              .map((itemMenu) => {
                if (itemMenu.page_section === 'title') {
                  return (
                    <h5 key={itemMenu.id} className={styles.titleTopDevis}>
                      {itemMenu.text}
                    </h5>
                  );
                } else return <p key={itemMenu.position}>{itemMenu.text}</p>;
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
    .get(`${apiUrl}/pagescontent/top-devis`)
    .then((response) => response.data)
    .then((data) => data.filter((element) => element.visible === 1));

  return {
    props: {
      posts,
    },
  };
}

export default TopDevis;
