import React from 'react';
import '../node_modules/uikit/dist/css/uikit.min.css'
import '../node_modules/uikit/dist/js/uikit.min.js'

function Inscription() {
  return (
<div className="data-uk-card data-uk-card-default data-uk-card-hover data-uk-card-large data-uk-card-body">
    <h1 className="data-uk-card-title data-uk-text-center">Inscrivez-vous!</h1>
      <form>
        <fieldset className="data-uk-fieldset">
            
          <div className="data-uk-margin data-uk-grid-small data-uk-child-width-auto data-uk-grid">
            <label><input className="data-uk-radio" type="radio" name="radio2" /> Madame</label>
            <label><input className="data-uk-radio" type="radio" name="radio2" /> Monsieur</label>
          </div>
          <div className="data-uk-margin">
              <input className="data-uk-input" type="text" placeholder="Nom*"/>
          </div>
          <div className="data-data-uk-margin">
              <input className="data-uk-input" type="text" placeholder="Prénom*"/>
          </div>
          <div className="data-uk-margin">
              <input className="data-uk-input" type="text" placeholder="Nom d'utilisateur"/>
          </div>
          <div className="data-uk-margin">
              <input className="data-uk-input" type="text" placeholder="Adresse postale*"/>
          </div>
          <div className="data-uk-margin">
              <input className="data-uk-input" type="text" placeholder="Code postal*"/>
          </div>
          <div className="data-uk-margin">
              <input className="data-uk-input" type="text" placeholder="Adresse e-mail*"/>
          </div>
          <div className="data-uk-margin">
              <input className="data-uk-input" type="text" placeholder="Mot de passe*"/>
          </div>
          <div className="data-uk-margin">
              <input className="data-uk-input" type="text" placeholder="Confirmer Mot de passe*"/>
          </div>
          <div className="data-uk-margin data-uk-grid-small data-uk-child-width-auto data-uk-grid">
            <label><input className="data-uk-checkbox" type="checkbox"/> J'accepte de recevoir des newletters</label>
        </div>
          <label><input className="data-uk-checkbox" type="checkbox"/>En soumettant ce formulaire, j'accepte que les données saisies soient collectées dans le but de traiter ma demande*</label>
          <p className="data-uk-margin">
          <button className="data-uk-button data-uk-button-primary data-uk-button-large">S'inscrire</button>
          </p>

        </fieldset>
      </form>
    
    </div>
  );

};

export default Inscription;
