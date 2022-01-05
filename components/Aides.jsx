import React from 'react';

function Aides() {
  return (
    <div className="uk-card uk-card-default uk-card-hover uk-card-large uk-card-body uk-text-center">
      <h1 className="uk-card-title">Aides</h1>
      <form>
        <fieldset className="uk-fieldset">
          <div className="uk-margin uk-grid-large">
            <label>
              <input className="uk-radio" type="radio" name="radio2" /> Madame
            </label>
            <label>
              <input className="uk-radio" type="radio" name="radio2" /> Monsieur
            </label>
          </div>
          <div className="uk-margin">
            <input className="uk-input uk-form-width-large" type="text" placeholder="Nom*" />
          </div>
          <div className="uk-margin">
            <input className="uk-input uk-form-width-large" type="text" placeholder="Prénom*" />
          </div>
          <div className="uk-margin">
            <input className="uk-input uk-form-width-large" type="text" placeholder="Nom d'utilisateur" />
          </div>
          <div className="uk-margin">
            <input className="uk-input uk-form-width-large" type="text" placeholder="Adresse postale*" />
          </div>
          <div className="uk-margin">
            <input className="uk-input uk-form-width-large" type="text" placeholder="Code postal*" />
          </div>
          <div className="uk-margin">
            <input className="uk-input uk-form-width-large" type="text" placeholder="Adresse e-mail*" />
          </div>
          <div className="uk-margin">
            <input className="uk-input uk-form-width-large" type="text" placeholder="Mot de passe*" />
          </div>
          <div className="uk-margin">
            <input className="uk-input uk-form-width-large" type="text" placeholder="Confirmer Mot de passe*" />
          </div>
          <div className="uk-margin uk-grid-small uk-child-width-auto">
            <label>
              <input className="uk-checkbox" type="checkbox" /> J accepte de recevoir des newsletters
            </label>
            <div className="uk-margin uk-grid-small uk-child-width-auto">
              <label>
                <input className="uk-checkbox" type="checkbox" /> En soumettant ce formulaire, j accepte que les données saisies soient collectées
                dans le but de traiter ma demande*
              </label>
            </div>
          </div>
          <p className="uk-margin">
            <a className="uk-button uk-button-default" href="#modal-center" uk-toggle>
              S inscrire
            </a>

            <div id="modal-center" className="uk-flex-top" uk-modal>
              <div className="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
                <button className="uk-modal-close-default" type="button" uk-close></button>
                <h2 className="uk-modal-title">Bienvenue!</h2>
                <p>Votre inscription a bien été prise en compte.</p>
                <p>
                  Vous pouvez fermer ce message en utilisant la croix en haut à droite ou bien directement rejoindre votre espace client en cliquant{' '}
                  <a href="/EspaceClient">ici</a>
                </p>
              </div>
            </div>
          </p>
        </fieldset>
      </form>
    </div>
  );
}

export default Aides;
