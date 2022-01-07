import React from 'react';
import Image from 'next/image';
import image1 from '../public/artisan.jpg';
import image2 from '../public/aides.jpg';
import Link from 'next/link';

function HomePage () {
 return (
     <div className="">
    <div className="">
    <div>
        <div className="">
            <div className="">
                <h3 className="">Devis</h3>
                <p>Trouvez l'artisan qu'il vous faut et demandez un devis <Link href="/pages/devis">ici</Link>.</p>
                <Image
                src={image1}
                alt="Image artisan"
                width="400"
                height="300"
                placeholder="blur"
                priority="true"
                />
            </div>
        </div>
    </div>
    <div>
        <div className="">
            <div className="">
                <h3 className="">Aides</h3>
                <p>Estimez le montant de vos aides à la rénovation <Link href="/pages/aides">ici</Link>.</p>
                <Image
                src={image2}
                alt="Image billets"
                width="400"
                height="300"
                placeholder="blur"
                priority="true"
                />
            </div>
        </div>
    </div>
</div>
         
</div>
 )
}

export default HomePage;