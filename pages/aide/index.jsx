import React from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import axios from 'axios';
import styles from '../../styles/Aide.module.css';
import { Nav } from 'react-bootstrap';

function AideAccueil({ posts }) {
  return (
    <>
      <NavBar pageType="devis" />
      {posts
        .filter((titlesMenu) => titlesMenu.page_section === 'chaperTitle')
        .map((titleMenu) => {
          return (
            <h5 key={titleMenu.id} className={styles.titleAide}>
              {titleMenu.text}
            </h5>
          );
        })}

      {!posts ? (
        <p>Loading</p>
      ) : (
        <div className={styles.containerAide}>
          <div className={styles.textAide}>
            {posts
              .filter((itemsMenu) => itemsMenu.page_section !== 'chaperTitle' && itemsMenu.position < 6)
              .map((itemMenu) => {
                if (itemMenu.page_section === 'lien') {
                  return (
                    <div key={itemMenu.position}>
                      <Nav.Link href={itemMenu.pages.url} className={styles.linkAide}>
                        {itemMenu.text}
                      </Nav.Link>
                    </div>
                  );
                } else {
                  return <p key={itemMenu.position}>{itemMenu.text}</p>;
                }
              })}
          </div>
          <div className={styles.textAide}>
            {posts
              .filter((itemsMenu) => itemsMenu.page_section !== 'chaperTitle' && itemsMenu.position >= 6)
              .map((itemMenu) => {
                if (itemMenu.page_section === 'title') {
                  return (
                    <h5 key={itemMenu.id} className={styles.titleAide}>
                      {itemMenu.text}
                    </h5>
                  );
                } else return <p key={itemMenu.position}>{itemMenu.text}</p>;
              })}
          </div>
        </div>
      )}
      <Footer pageType="devis" />
    </>
  );
}
export async function getStaticProps() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const posts = await axios
    .get(`${apiUrl}/pagescontent/aide`)
    .then((response) => response.data)
    .then((data) => data.filter((element) => element.visible === 1));

  return {
    props: {
      posts,
    },
  };
}

export default AideAccueil;
