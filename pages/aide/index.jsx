import React from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import axios from 'axios';
import styles from '../../styles/Aide.module.css';
import { Nav } from 'react-bootstrap';
// import SCAP1 from '../../components/SCAP1';

function Aide({ posts }) {
  
  );return (
    <div>
      <NavBar pageType="devis" />
      {posts
        .filter((titlesMenu) => titlesMenu.page_section === 'chaperTitle')
        .map((titleMenu) => {
          return (
            <div key={titleMenu.id}>
              <h5 key={titleMenu.id} className={styles.titleAide}>
                {titleMenu.text}
              </h5>
            </div>
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
    </div>
}
export async function getStaticProps() {
  const posts = await axios
    .get('http://localhost:8000/api/pagescontent')
    .then((response) => response.data)
    .then((data) => data.filter((element) => element.visible === 1 && element.page_name === 'aide'));

  return {
    props: {
      posts,
    },
  };
}

export default Aide;
