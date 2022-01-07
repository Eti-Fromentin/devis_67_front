import React from 'react';

import 'uikit/dist/css/uikit.min.css';

export default function EspaceClient() {
  return (
    <div>
      <div className="uk-card uk-card-body uk-align-center">
        <h1>Espace Client</h1>
        <h2>Bonjour Nom d Utilisateur</h2>
      </div>
      <div className="uk-flex uk-flex-center">
        <div className="uk-card uk-card-small uk-card-default">
          <div className="uk-card-header">
            <h3 className="uk-card-title">Voici vos devis</h3>
          </div>
          <div className="uk-card-body">
            <p>Devis numero 1</p>
            <p>Devis numero 2</p>
          </div>
          <div className="uk-card-footer">
            <bouton>Telecharger en Pdf</bouton>
          </div>
        </div>
        <div className="uk-card uk-card-small uk-card-default">
          <div className="uk-card-header">
            <h3 className="uk-card-title">Voici vos simulations d aide</h3>
          </div>
          <div className="uk-card-body">
            <p>Simulation numero 1</p>
            <p>Simulation numero 2</p>
          </div>
          <div className="uk-card-footer">
            <bouton>Telecharger en Pdf</bouton>
          </div>
        </div>
      </div>
    </div>
  );
}
