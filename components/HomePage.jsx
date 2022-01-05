import React from 'react';
import 'uikit/dist/css/uikit.min.css';

function HomePage () {
 return (
     <div>
    <div className="uk-column-1-2 uk-column-divider">
    <div>
        <div className="uk-card uk-card-default uk-card-large uk-margin-medium">
            <div className="uk-card-media-top">
                <img src="../assets/artisan.jpg" alt=""/>
            </div>
            <div className="uk-card-body">
                <h3 className="uk-card-title">Devis</h3>
                <p>Trouvez l'artisan qu'il vous faut et demandez un devis.</p>
            </div>
        </div>
    </div>
    <div>
        <div className="uk-card uk-card-primary uk-card-large">
            <div className="uk-card-body">
                <h3 className="uk-card-title">Aides</h3>
                <p>Estimez le montant de vos aides à la rénovation.</p>
            </div>
            <div className="uk-card-media-bottom">
                <img src="../assets/aides.jpg" alt=""/>
            </div>
        </div>
    </div>
</div>
         
</div>
 )
}

export default HomePage;