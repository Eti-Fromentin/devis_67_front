import React from 'react';
import axios from 'axios';

import Head from 'next/head';
import Link from 'next/link';
import { InputGroup, FormControl, Button, Card } from 'react-bootstrap';

import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';

import Data from '../../dataCategory.json';
import pic from '../../Assets/maison.jpg';
<<<<<<< HEAD
<<<<<<< HEAD

import styles from '../../styles/DevisHome.module.css';

=======
import { InputGroup, FormControl, Button, Card } from 'react-bootstrap';
import Head from 'next/head';
import axios from 'axios';
import Link from 'next/link';

>>>>>>> cdc5afd302ce9385bf70030fdac18be39cdc02f0
=======

import styles from '../../styles/DevisHome.module.css';


>>>>>>> 94d56238f5c31cff8a2c6a28039b7927b3217b26
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
              {Data.filter((element) => element.position === 5 && element.id === 16).map((element) => {
                return <span key={element.position}>{element.text}</span>;
                // }
              })}
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
<<<<<<< HEAD
=======

>>>>>>> f13728c422018a26d497ec5cacd4ab5a4fc82043
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
<<<<<<< HEAD
            </div>
          </aside>
=======
<<<<<<< HEAD
<<<<<<< HEAD
=======
              {/* {Data.filter((element) => element.position === 1).map((element) => {
                return <span key={element.id}>{element.text}</span>;
              })} */}
              {/* <Link href="http://localhost:3000/devis/F%C3%A9n%C3%AAtres">
                <span>Fenêtres</span>
              </Link>
              <Link href="http://localhost:3000/devis/F%C3%A9n%C3%AAtres">
                <span>Construction - Extension</span>
              </Link>
              <Link href="http://localhost:3000/devis/F%C3%A9n%C3%AAtres">
                <span>Rénovation intérieure</span>
              </Link> */}
              {/* <Link href="http://localhost:3000/devis/F%C3%A9n%C3%AAtres">
                <span>Chauffage - Chaudière</span>
              </Link>
              <Link href="http://localhost:3000/devis/F%C3%A9n%C3%AAtres">
                <span>Menuiseries (alu, bois, pvc)</span>
              </Link>
              <Link href="http://localhost:3000/devis/F%C3%A9n%C3%AAtres">
                <span>Toiture - Charpente</span>
              </Link>
              <Link href="http://localhost:3000/devis/F%C3%A9n%C3%AAtres">
                <span>Climatisation - Ventilation</span>
              </Link>
              <Link href="http://localhost:3000/devis/F%C3%A9n%C3%AAtres">
                <span>Architecture</span>
              </Link>
              <Link href="http://localhost:3000/devis/F%C3%A9n%C3%AAtres">
                <span>Salle de bains</span>
              </Link> */}
              {/* <Link href="http://localhost:3000/devis/F%C3%A9n%C3%AAtres">
                <span>Peinture - Tapisserie</span>
              </Link>
              <Link href="http://localhost:3000/devis/F%C3%A9n%C3%AAtres">
                <span>Plomberie</span>
              </Link>
              <Link href="http://localhost:3000/devis/F%C3%A9n%C3%AAtres">
                <span>Sols intérieurs</span>
              </Link>
              <Link href="http://localhost:3000/devis/F%C3%A9n%C3%AAtres">
                <span>Sols extérieurs</span>
              </Link>
              <Link href="http://localhost:3000/devis/F%C3%A9n%C3%AAtres">
                <span>Piscine</span>
              </Link>
              <Link href="http://localhost:3000/devis/F%C3%A9n%C3%AAtres">
                <span>Aménagement intérieur</span>
              </Link> */}
>>>>>>> cdc5afd302ce9385bf70030fdac18be39cdc02f0
=======

>>>>>>> 94d56238f5c31cff8a2c6a28039b7927b3217b26
            </div>
          </aside>

>>>>>>> f13728c422018a26d497ec5cacd4ab5a4fc82043
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
