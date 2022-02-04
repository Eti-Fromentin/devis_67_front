import React from 'react';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { InputGroup, FormControl, Button, Card } from 'react-bootstrap';

import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';

import pic from '../../Assets/maison.jpg';
import styles from '../../styles/DevisHome.module.css';

const DevisHome = ({ headInfo, devisInfo }) => {
  const head = headInfo && headInfo[0];
  const devis = devisInfo;
  return (
    <>
      <Head>
        <title>{head.title}</title>
        <meta name="description" content={head.description} />
        <meta name="keywords" content={head.keywords} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NavBar pageType="devis" />
      <section className={styles.bodyDevisHome}>
        <section className={styles.containerDevisHome}>
          <aside className={styles.leftContainerDevisHome}>
            <div className={styles.leftTextDevisHome}>
              <p>POUR FAIRE VOTRE DEMANDE SÉLECTIONNEZ UNE DES CATÉGORIES CI-DESSOUS</p>
            </div>
            <div className={styles.leftSearchBarDevisHome}>
              <div className={styles.searchBoxDevisHome}>
                <InputGroup className={styles.inputGroupIndexDevis}>
                  <FormControl
                    placeholder="Tapez votre recherche"
                    aria-label="Tapez votre recherche"
                    className={styles.formControlSearchIndexDevis}
                    aria-describedby="basic-addon2"
                  />
                  <Button variant="outline-secondary" id="button-addon2">
                    Search
                  </Button>
                </InputGroup>
              </div>
            </div>
            <div className={styles.leftOptionsDevisHome}>
              {devis.map((element, index) => {
                return (
                  <Link key={index} href={element.pages.url}>
                    <Card className={styles.cardDevisHome} key={index}>
                      {element.title}
                    </Card>
                  </Link>
                );
              })}
            </div>
          </aside>
          <aside className={styles.rightContainerDevisHome}>
            <aside className={styles.hightBlockDevisHome}>
              <div className={styles.titlehightBlockDevisHome}>
                <span>BESOIN DE FAIRE APPEL À UN ARTISAN ?</span>
                <span>DEVIS67 EST LA SOLUTION !</span>
              </div>
              <div className={styles.infohightBlockDevisHome}>
                <span>COMMENT EST-CE QUE ÇA FONCTIONNE ?</span>
                <div className={styles.displayDevisHome}>
                  <img src={pic} width={40} height={40} alt="pic" />
                  Faites votre demande de devis.
                </div>
                <div className={styles.displayDevisHome}>
                  <img src={pic} width={40} height={40} alt="pic" />
                  Recevez gratuitement des devis sur mesure.
                </div>
                <div className={styles.displayDevisHome}>
                  <img src={pic} width={40} height={40} alt="pic" />
                  Comparez et sélectionnez lartisan de votre choix.
                </div>
              </div>
            </aside>
            <aside className={styles.lowBlockDevisHome}></aside>
          </aside>
        </section>
      </section>
      <Footer />
    </>
  );
};

export async function getStaticProps() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const devisInfo = await axios.get(`${apiUrl}/homedevis/categories`).then((response) => response.data);
  const headInfo = await axios.get(`${apiUrl}/pagesdetails/devis`).then((response) => response.data);

  return {
    props: {
      devisInfo,
      headInfo,
      apiUrl,
    },
  };
}
export default DevisHome;
