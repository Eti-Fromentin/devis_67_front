import React from 'react';
import Link from 'next/link';

function Connexion() {
  return (
<div class="uk-card uk-card-default uk-card-hover uk-card-large uk-card-body">
    <h1 class="uk-card-title uk-text-center">BIENVENUE!</h1>
    <p>Connectez-vous grâce à votre adresse e-mail et votre mot de passe.</p>
    <form>
            <fieldset class="uk-fieldset">

            <div class="uk-margin">
                <input class="uk-input" type="text" placeholder="Adresse e-mail*"/>
            </div>
            <div class="uk-margin">
                <input class="uk-input" type="text" placeholder="Mot de passe*"/>
            </div>

            <Link href="">Mot de passe oublié?</Link>
            <p class="uk-margin">
            <button class="uk-button uk-button-primary uk-button-large">Connexion</button>
            </p>
        <p>Pas encore inscrit(e)? cliquez <a href="/inscription">ici</a></p>

        </fieldset>
    </form>
    
    </div>
    );
};

export default Connexion;
