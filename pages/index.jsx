import React from 'react';
import Connexion from './Connexion';
import Inscription from './Inscription';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Connexion />
      <Inscription />
    </div>
  );
}
