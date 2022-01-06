import React from 'react';
import Image from 'next/image';
import image1 from '../public/artisan.jpg';
import image2 from '../public/aides.jpg';
import 'uikit/dist/css/uikit.min.css';

function HomePage () {
 return (
     <div className="uk-container uk-position-center">
    <div className="uk-column-1-2 uk-column-divider">
    <div>
        <div className="uk-card uk-card-default uk-card-large uk-margin">
            <div className="uk-card-body">
                <h3 className="uk-card-title">Devis</h3>
                <p>Trouvez l'artisan qu'il vous faut et demandez un devis.</p>
                <Image
                src={image1}
                alt="Image artisan"
                width="500px"
                height="400px"
                placeholder="blur"
                />
            </div>
        </div>
    </div>
    <div>
        <div className="uk-card uk-card-primary uk-card-large uk-margin">
            <div className="uk-card-body">
                <h3 className="uk-card-title">Aides</h3>
                <p>Estimez le montant de vos aides à la rénovation.</p>
                <Image
                src={image2}
                alt="Image billets"
                width="500px"
                height="400px"
                placeholder="blur"
                />
            </div>
        </div>
    </div>
</div>
         
</div>
 )
}

export default HomePage;