import React from 'react';

function Inscription() {

  return (
    <div className="">
      <h1 className="">Inscrivez-vous!</h1>
      <form>
        <fieldset className="">
          <div className="">
            <label>
              <input className="uk-radio" type="radio" name="radio2" /> Madame
            </label>
            <label>
              <input className="uk-radio" type="radio" name="radio2" /> Monsieur
            </label>
          </div>
          <div className="">
            <input className="" type="text" placeholder="Nom*" />
          </div>
          <div className="">
            <input className="" type="text" placeholder="Prénom*" />
          </div>
          <div className="">
            <input className="" type="text" placeholder="Nom d'utilisateur" />
          </div>
          <div className="">
            <input className="" type="text" placeholder="Adresse postale*" />
          </div>
          <div className="">
            <input className="" type="text" placeholder="Code postal*" />
          </div>
          <div className="">
            <input className="" type="text" placeholder="Adresse e-mail*" />
          </div>
          <div className="">
            <input className="" type="text" placeholder="Mot de passe*" />
          </div>
          <div className="">
            <input className="" type="text" placeholder="Confirmer Mot de passe*" />
          </div>
          <div className="">
            <label>
              <input className="" type="checkbox" /> J'accepte de recevoir des newsletters
            </label>
            <div className="">
              <label>
                <input className="" type="checkbox" /> En soumettant ce formulaire, j'accepte que les données saisies soient collectées
                dans le but de traiter ma demande*
              </label>
            </div>
          </div>
          <p className="">
          <button class="" >S'inscrire</button>
          </p>
        </fieldset>
      </form>
    </div>
  );
}

export default Inscription;
