import React from 'react';
import styles from '../styles/AnnPageCommune.module.css';

const AnnPageCommune = () => {
  return (
    <main className={styles.containerAnnPageCommune}>
      <section className={styles.cardContainerAnnPageCommune}>
        <div className={styles.firstRowCardAnnPageCommune}>
          <span></span>
        </div>
        <div className={styles.secondRowCardAnnPageCommune}>
          <span></span>
        </div>
        <div className={styles.thirdRowCardAnnPageCommune}>
          <section className={styles.sumUpDevisAnnPageCommune}>
            <span>Annuaire PAGE COMMUNE/DEFAUT</span>
          </section>
        </div>
        <div className={styles.fourthRowCardAnnPageCommune}>
          <button>SUIVANT</button>
        </div>
      </section>
    </main>
  );
};

export default AnnPageCommune;
