import React from 'react';
import Link from 'next/link';


function Connexion() {
  return (
<div className="">
    <h1 className="">BIENVENUE!</h1>
    <p>Connectez-vous grâce à votre adresse e-mail et votre mot de passe.</p>
    <form>
            <fieldset className="">

            <div className="">
                    <input className="" type="text" placeholder="Adresse e-mail*"/>
                </div>
            <div className="">
                <input className="" type="text" placeholder="Mot de passe*"/>
                </div>

            <Link href="">Mot de passe oublié?</Link>
            <p className="">
            <button className="">Connexion</button>
            </p>
        <p>Pas encore inscrit(e)? cliquez <Link href="/inscription">ici</Link></p>

        </fieldset>
    </form>
    
    </div>
    );
};

export default Connexion;
