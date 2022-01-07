import React from 'react';
import Image from 'next/image';
import image1 from '../public/artisan.jpg';
import image2 from '../public/aides.jpg';
import Link from 'next/link';
import 'uikit/dist/css/uikit.min.css';

function HomePage () {
 return (
     <div className="uk-container uk-position-center">
    <div className="uk-column-1-2 uk-column-divider">
    <div>
        <div className="uk-card uk-card-default uk-card-medium">
            <div className="uk-card-body">
                <h3 className="uk-card-title">Devis</h3>
                <p>Trouvez l'artisan qu'il vous faut et demandez un devis <Link href="/pages/devis">ici</Link>.</p>
                <Image
                src={image1}
                alt="Image artisan"
                width="400px"
                height="300px"
                placeholder="blur"
                />
            </div>
        </div>
    </div>
    <div>
        <div className="uk-card uk-card-primary uk-card-medium">
            <div className="uk-card-body">
                <h3 className="uk-card-title">Aides</h3>
                <p>Estimez le montant de vos aides à la rénovation <Link href="/pages/aides">ici</Link>.</p>
                <Image
                src={image2}
                alt="Image billets"
                width="400px"
                height="300px"
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