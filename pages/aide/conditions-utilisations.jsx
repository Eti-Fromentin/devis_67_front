import React from 'react';
import axios from 'axios';
import { HashLink as Link } from 'react-router-hash-link';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import styles from '../../styles/Conditions.module.css';

function ConditionsUtilisations({ posts }) {
  return (
    <div>
      <NavBar pageType="devis" />
      <h1>Conditions d&#039; utilisations</h1>
      {!posts ? (
        <p>Loading</p>
      ) : (
        <div className={styles.containerConditions}>
          <div className={styles.textConditions}>
            <ul>
              {posts
                .filter((itemsMenu) => itemsMenu.page_section === 'chapterTitle')
                .map((itemMenu) => (
                  <li className={styles.itemsMenu} key={itemMenu.key}>
                    {itemMenu.text}</li>
                  // <Link to={`#${itemMenu.key}`}>className={styles.itemsMenu} key={itemMenu.key}>
                  //   {itemMenu.text}
                  // </Link>
                ))}
            </ul>
            <div>
              {posts.map((itemMenu) => {
                if (itemMenu.page_section === 'chapterTitle') {
                  return (
                    <div key={itemMenu.position}>
                      <h5 className={styles.titleConditions} id={itemMenu.key} key={itemMenu.position}>
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
  );
}
export async function getStaticProps() {
  const posts = await axios
    .get('http://localhost:8000/api/pagescontent/conditions')
    .then((response) => response.data)
    .then((data) => data.filter((element) => element.visible === 1));

  return {
    props: {
      posts,
    },
  };
}

export default ConditionsUtilisations;
