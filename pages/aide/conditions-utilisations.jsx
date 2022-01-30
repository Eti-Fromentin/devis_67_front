import React from 'react';
import axios from 'axios';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import styles from '../../styles/Conditions.module.css';

function ConditionsUtilisations({ posts }) {
  return (
    <div>
      <div>
        <NavBar pageType="devis" />
        <h1>Conditions d&#039; utilisations</h1>
        {!posts ? (
          <p>Loading</p>
        ) : (
          <div className={styles.containerConditions}>
            <div className={styles.textConditions}>
              <ol>
                {posts
                  .filter((itemsMenu) => itemsMenu.page_section === 'chapterTitle')
                  .map((itemMenu) => (
                    <li className={styles.itemsMenu} key={itemMenu.key}>
                      <a href={`#${itemMenu.text}`} className={styles.linkConditions}>
                        {itemMenu.text}
                      </a>
                    </li>
                  ))}
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
  const posts = await axios
    .get(`${apiUrl}/pagescontent/conditions`)
    .then((response) => response.data)
    .then((data) => data.filter((element) => element.visible === 1));
  return {
    props: {
      posts,
    },
  };
}

export default ConditionsUtilisations;
