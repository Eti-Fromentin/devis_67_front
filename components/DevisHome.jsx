import React from 'react';
import styles from '../styles/DevisHome.module.css';
import pic from '../Assets/maison.jpg';
import Data from '../dataCategory.json';
// import axios from 'axios';

const DevisHome = () => {
  return (
    <section className={styles.bodyDevisHome}>
      {/* PRINCIPAL CONTAINER */}
      <section className={styles.containerDevisHome}>
        {/* LEFT CONTAINER */}
        <aside className={styles.leftContainerDevisHome}>
          {/* GRID 3 columns */}
          <div className={styles.leftTextDevisHome}>
            {Data.filter((element) => element.position === 5 && element.id === 16).map((element) => {
              // if (element.position === 5) {
              return <span key={element.position}>{element.text}</span>;
              // }
            })}
          </div>
          <div className={styles.leftSearchBarDevisHome}>
            {/* search bar */}
            <div className={styles.searchBoxDevisHome}>
              <input className={styles.searchInputDevisHome} type="text" placeholder="Tapez votre recherche..."></input>
              <button className={styles.searchBtnDevisHome}>
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
          {/* options */}
          <div className={styles.leftOptionsDevisHome}>
            {Data.map((element) => {
              return <span key={element.id}>{element.text}</span>;
            })}
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
  );
};

export default DevisHome;
