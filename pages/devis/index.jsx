import React from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import styles from '../../styles/DevisHome.module.css';
import Data from '../../dataCategory.json';
import pic from '../../Assets/maison.jpg';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';
import Link from 'next/link';

const DevisHome = () => {
  return (
    <>
      <NavBar pageType="devis" />
      <section className={styles.bodyDevisHome}>
        {/* PRINCIPAL CONTAINER */}
        <section className={styles.containerDevisHome}>
          {/* LEFT CONTAINER */}
          <aside className={styles.leftContainerDevisHome}>
            {/* GRID 3 columns */}
            <div className={styles.leftTextDevisHome}>
              {Data.filter((element) => element.position === 5 && element.id === 16).map((element) => {
                return <span key={element.position}>{element.text}</span>;
                // }
              })}
              {/* {!url.length ? (
                <Spinner animation="border" />
              ) : (
                url.map((data) => {
                  <span key={data.id}>{data.url}</span>;
                })
              )} */}
            </div>
            <div className={styles.leftSearchBarDevisHome}>
              {/* search bar */}
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
            {/* options */}
            <div className={styles.leftOptionsDevisHome}>
              {/* {Data.filter((element) => element.position === 1).map((element) => {
                return <span key={element.id}>{element.text}</span>;
              })} */}
              <Link href="http://localhost:3000/devis/F%C3%A9n%C3%AAtres">
                <span>Fenêtres</span>
              </Link>
              <Link href="http://localhost:3000/devis/F%C3%A9n%C3%AAtres">
                <span>Construction - Extension</span>
              </Link>
              <Link href="http://localhost:3000/devis/F%C3%A9n%C3%AAtres">
                <span>Rénovation intérieure</span>
              </Link>
              <Link href="http://localhost:3000/devis/F%C3%A9n%C3%AAtres">
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
              </Link>
              <Link href="http://localhost:3000/devis/F%C3%A9n%C3%AAtres">
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
              </Link>
            </div>
          </aside>
          {/* RIGHT CONTAINER */}
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
            <aside className={styles.lowBlockDevisHome}>{/* IMAGE URL BACKGROUND */}</aside>
          </aside>
        </section>
      </section>
      <Footer />
    </>
  );
};

export async function getStaticProps() {
  const url = await axios.get('http://localhost:8000/api/homedevis/categories').then((response) => response.data);

  return {
    props: {
      url,
    },
  };
}
export default DevisHome;
