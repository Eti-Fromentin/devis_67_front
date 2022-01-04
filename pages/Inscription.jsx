import React from 'react';

function Inscription() {
  return (
<div className="uk-card uk-card-default uk-card-hover uk-card-large uk-card-body">
    <h1 className="uk-card-title uk-text-center">Inscrivez-vous!</h1>
      <form>
        <fieldset className="uk-fieldset">
            
          <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
            <label><input className="uk-radio" type="radio" name="radio2" /> Madame</label>
            <label><input className="uk-radio" type="radio" name="radio2" /> Monsieur</label>
          </div>
          <div className="uk-margin">
              <input className="uk-input" type="text" placeholder="Nom*"/>
          </div>
          <div className="uk-margin">
              <input className="uk-input" type="text" placeholder="Prénom*"/>
          </div>
          <div className="uk-margin">
              <input className="uk-input" type="text" placeholder="Nom d'utilisateur"/>
          </div>
          <div className="uk-margin">
              <input className="uk-input" type="text" placeholder="Adresse postale*"/>
          </div>
          <div className="uk-margin">
              <input className="uk-input" type="text" placeholder="Code postal*"/>
          </div>
          <div className="uk-margin">
              <input className="uk-input" type="text" placeholder="Adresse e-mail*"/>
          </div>
          <div className="uk-margin">
              <input className="uk-input" type="text" placeholder="Mot de passe*"/>
          </div>
          <div className="uk-margin">
              <input className="uk-input" type="text" placeholder="Confirmer Mot de passe*"/>
          </div>
          <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
            <label><input className="uk-checkbox" type="checkbox"/> J'accepte de recevoir des newletters</label>
        </div>
          <label><input className="uk-checkbox" type="checkbox"/>En soumettant ce formulaire, j'accepte que les données saisies soient collectées dans le but de traiter ma demande*</label>
          <p className="uk-margin">
          <button className="uk-button uk-button-primary uk-button-large">S'inscrire</button>
          </p>

        </fieldset>
      </form>
    
    </div>
  );

};

export default Inscription;
