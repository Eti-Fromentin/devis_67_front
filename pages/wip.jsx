import React from 'react';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

import styles from '../styles/Wip.module.css';

function Wip() {
  return (
    <div>
      <NavBar pageType="devis" />
      <div className={styles.containerWip}>
        <h1 className={styles.titleWip}>Prochainement</h1>
      </div>
      <Footer pageType="devis" />
    </div>
  );
}
export default Wip;
