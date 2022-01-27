import React from 'react';
import Head from 'next/head';
import axios from 'axios';

//import { HashLink as Link } from 'react-router-hash-link';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import styles from '../../styles/Conditions.module.css';

function ConditionsUtilisations({ posts, dataHead }) {
  console.log(posts);
  return (
    <div>
      <div>
        <Head>
          <title>{dataHead.title}</title>
          <meta name="description" content={dataHead.description} />
          <meta name="keywords" content={dataHead.keywords} />
        </Head>
      </div>
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
                      {itemMenu.text}
                    </li>
                    //<Link className={styles.itemsMenu} key={itemMenu.key} href={href}>
                    //  <a>{itemMenu.text}</a>
                    //</Link>

                    // function NavLink({ href, name }) {
                    //   return (
                    //     <Link href={href}>
                    //       <a>{name}</a>
                    //     </Link>
                    //   )
                    // }

                    //export default NavLink
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
    </div>
  );
}
export async function getStaticProps() {
  const posts = await axios
    .get('http://localhost:8000/api/pagescontent/conditions')
    .then((response) => response.data)
    .then((data) => data.filter((element) => element.visible === 1));
  const dataHead = await axios
    .get('http://localhost:8000/api/pages')
    .then((response) => response.data)
    .then((data) => data.filter((elements) => elements.url === '/aide/conditions-utilisations'));

  return {
    props: {
      posts,
      dataHead,
    },
  };
}

export default ConditionsUtilisations;
