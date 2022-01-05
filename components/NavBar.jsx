/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import 'uikit/dist/css/uikit.min.css';

function NavBar() {
  return (
    <div>
      <nav className="uk-navbar-container" uk-navbar>
        <div className="uk-navbar-left">
          <ul className="uk-navbar-nav">
            <li className="uk-active">
              <a href="/Home"></a>
            </li>
            <li className="uk-parent">
              <a href="/Devis"></a>
            </li>
            <li>
              <a href="/Aides"></a>
            </li>
          </ul>
        </div>
      </nav>
      <div></div>
      <div className={styles.headerContainer}>
        <ul className={styles.navbar}>
          <li className="navBar">
            <Link href="/">
              <img className="logo" src="../img/logo.png" alt="Devis_67" />
            </Link>
          </li>
          <li className="navBar">
            <Link href="/Home">Accueil</Link>
          </li>
          <li className="navBar">
            <Link href="/Devis">Demander un devis</Link>
          </li>
          <li className="navBar">
            <Link href="/Aides">Estimer des aides</Link>
          </li>
          <li className="navBar">
            <Link href="/Contact">Besoin d Aide</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default NavBar;
