/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';

import 'uikit/dist/css/uikit.min.css';

function NavBar() {
  return (
    <div>
      <nav className="uk-navbar-container" uk-navbar>
        <div className="uk-navbar-left">
          <ul className="uk-navbar-nav">
            <li className="uk-active">
              <a href="/">Home</a>
            </li>
            <li className="uk-parent">
              <a href="/DevisAides">Devis</a>
            </li>
            <li>
              <a href="/DevisAides">Aides</a>
            </li>
            <li>
              <a href="/Inscription">Inscription</a>
            </li>
            <li>
              <a href="/Connexion">Connexion</a>
            </li>
            <li>
              <a href="/EspaceClient">Espace Client</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
export default NavBar;
