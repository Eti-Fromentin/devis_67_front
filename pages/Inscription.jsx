import React from 'react';

function Inscription() {
  return (
<div class="uk-card uk-card-default uk-card-hover uk-card-large uk-card-body">
    <h1 class="uk-card-title uk-text-center">Inscrivez-vous!</h1>
      <form>
        <fieldset class="uk-fieldset">
            
          <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
            <label><input class="uk-radio" type="radio" name="radio2" /> Monsieur</label>
            <label><input class="uk-radio" type="radio" name="radio2" /> Madame</label>
          </div>
          <div class="uk-margin">
              <input class="uk-input" type="text" placeholder="Nom*"/>
          </div>
          <div class="uk-margin">
              <input class="uk-input" type="text" placeholder="Prénom*"/>
          </div>
          <div class="uk-margin">
              <input class="uk-input" type="text" placeholder="Nom d'utilisateur"/>
          </div>
          <div class="uk-margin">
              <input class="uk-input" type="text" placeholder="Adresse postale*"/>
          </div>
          <div class="uk-margin">
              <input class="uk-input" type="text" placeholder="Code postal*"/>
          </div>
          <div class="uk-margin">
              <input class="uk-input" type="text" placeholder="Adresse e-mail*"/>
          </div>
          <div class="uk-margin">
              <input class="uk-input" type="text" placeholder="Mot de passe*"/>
          </div>
          <div class="uk-margin">
              <input class="uk-input" type="text" placeholder="Confirmer Mot de passe*"/>
          </div>
          <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
            <label><input class="uk-checkbox" type="checkbox"/> J'accepte de recevoir des newletters</label>
        </div>
          <label><input class="uk-checkbox" type="checkbox"/>En soumettant ce formulaire, j'accepte que les données saisies soient collectées dans le but de traiter ma demande*</label>
          <p class="uk-margin">
          <button class="uk-button uk-button-primary uk-button-large">S'inscrire</button>
          </p>

        </fieldset>
      </form>
    
    </div>
  );

};

export default Inscription;
