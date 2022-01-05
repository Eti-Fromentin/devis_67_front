import React from 'react';
import Head from 'next/head';

import styles from '../styles/Home.module.css';

import 'uikit/dist/css/uikit.min.css';
/*import 'uikit/css/uikit.css';*/
/*import '../node_modules/uikit/dist/js/uikit.min.js';*/

export default function Home() {
  return (
    <div uk-grid>
      <div className="uk-card uk-card-body">
        <Head>
          <title>Isolation web</title>
        </Head>
      </div>

      <div className="uk-card uk-card-body">
        <h1 className={styles.title}>Devis 67 bis </h1>
      </div>
      <div className="uk-flex uk-flex-center">
        <div className="uk-card uk-card-body">
          <p>Pour faire votre demande selectioner une categorie ci-dessus</p>
          <input></input>
          <button>Rechercher</button>

          <ul>
            <li>Peinture</li>
            <li>Isolation</li>
            <li>Chauffage</li>
          </ul>
        </div>
        <div className="uk-card uk-card-body">
          <h2>Besoin d un artisan?Devis67 est la solution</h2>
          <ul>
            <li>Estimer vos aides</li>
            <li>Demander des devis</li>
            <li>Contacter votre artisan</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
