import React from 'react';
import Link from 'next/link';
import '../node_modules/uikit/dist/css/uikit.min.css'
import '../node_modules/uikit/dist/js/uikit.min.js'

function Connexion() {
  return (
<div className="data-uk-card data-uk-card-default data-uk-card-hover data-uk-card-large data-uk-card-body data-uk-text-center">
    <h1 className="data-uk-card-title data-uk-text-center">BIENVENUE!</h1>
    <p>Connectez-vous grâce à votre adresse e-mail et votre mot de passe.</p>
    <form>
            <fieldset className="data-uk-fieldset">

            <div className="data-uk-margin">
                <input className="data-uk-input" type="text" placeholder="Adresse e-mail*"/>
            </div>
            <div className="data-uk-margin">
                <input className="data-uk-input" type="text" placeholder="Mot de passe*"/>
            </div>

            <Link href="">Mot de passe oublié?</Link>
            <p className="data-uk-margin">
            <button className="data-uk-button data-uk-button-primary data-uk-button-large">Connexion</button>
            </p>
        <p>Pas encore inscrit(e)? cliquez <a href="/inscription">ici</a></p>

        </fieldset>
    </form>
    
    </div>
    );
};

export default Connexion;
