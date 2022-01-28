import React from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import styles from '../../styles/DevisHome.module.css';
// import Data from '../../dataCategory.json';
import pic from '../../Assets/maison.jpg';
import { InputGroup, FormControl, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';

const DevisHome = ({url}) => {
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
              {/* {Data.filter((element) => element.position === 5 && element.id === 16).map((element) => {
                return <span key={element.position}>{element.text}</span>;
                // }
              })} */}
              {!url ? (
                <Spinner animation="border" />
              ) : (
                url.map((data) => {
                  <span key={data.id}>{data.url}</span>;
                })
              )}
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
              {/* {Data.map((element) => {
                return <span key={element.id}>{element.text}</span>;
              })} */}
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
  const url = await axios
    .get('http://localhost:8000/api/homedevis/categories')
    .then((response) => response.data)
    .then((res) => res.data);

  return {
    props: {
      url,
    },
  };
}
export default DevisHome;
