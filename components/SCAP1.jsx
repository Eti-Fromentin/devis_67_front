import React from 'react';
import styles from '../styles/SCAP1.module.css';

const SCAP1 = () => {
  return (
    <>
      <section className={styles.containerscap1}>
        <div className={styles.carrescap1}>
          {/* 1 */}
          <div className={styles.titlescap1}>
            Simulez vos aides en quelques minutes afin d’obtenir votre devis au meilleur prix
            <div className={styles.barscap1}></div>
            Les travaux concernent :
          </div>
          {/* 2 */}
          <div className={styles.choicescap1}>
            {/* RIGHT BLOCK */}
            <div className={styles.leftblockscap1}>
              <span className={styles.circlescap1}></span>
              <div className={styles.imageblock}></div>
              <span>Une Maison</span>
            </div>
            {/* RIGHT BLOCK */}
            <div className={styles.rightblockscap1}>
              <span className={styles.circlescap1}></span>
              <div className={styles.imageblock2}></div>
              <span>Un appartement</span>
            </div>
          </div>
          {/* 3 */}
          <div className={styles.btnscap1}>
            <button className={styles.btnscap1}>SUIVANT</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default SCAP1;
