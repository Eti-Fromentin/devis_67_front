import React from 'react';
import Image from 'next/image';
import image1 from '../public/artisan.jpg';
import image2 from '../public/aides.jpg';
import Link from 'next/link';
import { Card } from 'react-bootstrap';
import styles from '../styles/HomePage.module.css';

function HomePage() {
  return (
    <div className={styles.home}>
      <Card className={styles.homecard}>
        <Card.Title>Formulaire Devis</Card.Title>
        <Card.Body>
          <Card.Text>
            Trouvez l'artisan qu'il vous faut et demandez un devis <Link href="/devis">ici</Link>
          </Card.Text>
          <div className={styles.homeImage}>
          <Image className={styles.homeImage} src={image1} alt="Image artisan" priority="true" placeholder="blur" />
          </div>
        </Card.Body>
      </Card>
      <Card className={styles.homecard}>
        <Card.Title>Calcul des Aides</Card.Title>
        <Card.Body>
          <Card.Text>
            Estimez le montant de vos aides à la rénovation <Link href="/aides">ici</Link>
          </Card.Text>
          <div className={styles.homeImage}>
          <Image src={image2} alt="Image billets" priority="true" placeholder="blur" />
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default HomePage;
