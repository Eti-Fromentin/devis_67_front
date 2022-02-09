import React from 'react';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { InputGroup, FormControl, Button, Card } from 'react-bootstrap';

import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    enablebackground="new 0 0 24 24"
                    height="24px"
                    viewBox="0 0 24 24"
                    width="24px"
                    fill="#000000"
                  >
                    <path d="M0,0h24v24H0V0z" fill="none" />
                    <g>
                      <path d="M19.5,3.5L18,2l-1.5,1.5L15,2l-1.5,1.5L12,2l-1.5,1.5L9,2L7.5,3.5L6,2v14H3v3c0,1.66,1.34,3,3,3h12c1.66,0,3-1.34,3-3V2 L19.5,3.5z M15,20H6c-0.55,0-1-0.45-1-1v-1h10V20z M19,19c0,0.55-0.45,1-1,1s-1-0.45-1-1v-3H8V5h11V19z" />
                      <rect height="2" width="6" x="9" y="7" />
                      <rect height="2" width="2" x="16" y="7" />
                      <rect height="2" width="6" x="9" y="10" />
                      <rect height="2" width="2" x="16" y="10" />
                    </g>
                  </svg>
                  Faites votre demande de devis.
                </div>
                <div className={styles.displayDevisHome}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z" />
                  </svg>
                  Recevez gratuitement des devis sur mesure.
                </div>
                <div className={styles.displayDevisHome}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    enablebackground="new 0 0 24 24"
                    height="24px"
                    viewBox="0 0 24 24"
                    width="24px"
                    fill="#000000"
                  >
                    <g>
                      <rect fill="none" height="24" width="24" x="0" y="0" />
                    </g>
                    <g>
                      <g>
                        <path d="M9,21h9c0.83,0,1.54-0.5,1.84-1.22l3.02-7.05C22.95,12.5,23,12.26,23,12v-2c0-1.1-0.9-2-2-2h-6.31l0.95-4.57l0.03-0.32 c0-0.41-0.17-0.79-0.44-1.06L14.17,1L7.58,7.59C7.22,7.95,7,8.45,7,9v10C7,20.1,7.9,21,9,21z M9,9l4.34-4.34L12,10h9v2l-3,7H9V9z M1,9h4v12H1V9z" />
                      </g>
                    </g>
                  </svg>
                  Comparez et sélectionnez l&apos;artisan de votre choix.
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

  const devisInfo = await axios.get(`${apiUrl}/homedevis/categories`).then((response) => response.data.filter((element) => element.visible === 1));
  const headInfo = await axios.get(`${apiUrl}/pagesdetails/devis`).then((response) => response.data);

  return {
    props: {
      devisInfo,
      headInfo,
    },
  };
}
export default DevisHome;
