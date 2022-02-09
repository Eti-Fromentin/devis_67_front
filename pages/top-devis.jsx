import React from 'react';

import axios from 'axios';
import { Nav } from 'react-bootstrap';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

import styles from '../styles/TopDevis.module.css';

function TopDevis({ data, faq }) {
  return (
    <div>
      <NavBar pageType="devis" />
      {!data ? (
        <p>Loading</p>
      ) : (
        <div className={styles.containerTopDevis}>
          <section className={styles.containerTitleTopDevis}>
            <h2 className={styles.H2TopDevis}>Les plus demandés</h2>
            <h3 className={styles.H3TopDevis}>Le top des devis demandés par les utilisateurs</h3>
            <h3 className={styles.H4TopDevis}>
              Voici le top 10 des devis demandés par les utilisateurs du service de devis gratuit proposé par devis67
            </h3>
          </section>
          <section className={styles.wrapperTextTopDevis}>
            <div className={styles.textTopDevis}>
              {data.map((itemMenu) => (
                <div key={itemMenu.position}>
                  <Nav.Link href={itemMenu.url} className={styles.linkTopDevis}>
                    {itemMenu.text}
                  </Nav.Link>
                </div>
              ))}
            </div>
            <div className={styles.textTopDevis}>
              {faq
                .filter((itemsMenu) => itemsMenu.page_section !== 'chaperTitle' && itemsMenu.page_name === 'modeEmploi')
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
          </section>
        </div>
      )}
      <Footer pageType="devis" />
    </div>
  );
}
export async function getStaticProps() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const data = await axios.get(`${apiUrl}/topten`).then((response) => response.data.filter((element) => element.visible === 1));
  const faq = await axios.get(`${apiUrl}/pagescontent/modeEmploi`).then((response) => response.data.filter((element) => element.visible === 1));
  return {
    props: {
      data,
      faq,
    },
  };
}

export default TopDevis;
