import React from 'react';
import Link from 'next/link';


function Connexion() {
  return (
<div className="uk-card uk-card-default uk-card-hover uk-card-large uk-card-body uk-text-center">
    <h1 className="uk-card-title uk-text-center">BIENVENUE!</h1>
    <p>Connectez-vous grâce à votre adresse e-mail et votre mot de passe.</p>
    <form>
            <fieldset className="uk-fieldset">

            <div className="uk-margin">
                <input className="uk-input uk-form-width-large" type="text" placeholder="Adresse e-mail*"/>
            </div>
            <div className="uk-margin">
                <input className="uk-input uk-form-width-large" type="text" placeholder="Mot de passe*"/>
            </div>

            <Link href="">Mot de passe oublié?</Link>
            <p className="uk-margin">
            <button className="uk-button uk-button-primary uk-button-large">Connexion</button>
            </p>
        <p>Pas encore inscrit(e)? cliquez <a href="/inscription">ici</a></p>

        </fieldset>
    </form>
    
    </div>
    );
};

export default Connexion;
