import React from 'react';
import Image from 'next/image';
import image1 from '../public/artisan.jpg';
import image2 from '../public/aides.jpg';
import Link from 'next/link';
import { Card, Container, Row, Col } from 'react-bootstrap';
import styles from '../styles/HomePage.module.css';

function HomePage() {
  return (
    <div className={styles.home}>
      <Container>
        <Row>
          <Col md={{order: 'first'}}>
      <Card className={styles.homecard}>
        <Card.Title>Formulaire Devis</Card.Title>
        <Card.Body>
          <Card.Text>
            Trouvez l'artisan qu'il vous faut et demandez un devis <Link href="/devis">ici</Link>
          </Card.Text>
          <div>
          <Image className={styles.homeImage} src={image1} alt="Image artisan" priority="true" placeholder="blur" />
          </div>
        </Card.Body>
      </Card>
      </Col>
      <Col md={{order: 'second'}}>
      <Card className={styles.homecard}>
        <Card.Title>Calcul des Aides</Card.Title>
        <Card.Body>
          <Card.Text>
            Estimez le montant de vos aides à la rénovation <Link href="/aides">ici</Link>
          </Card.Text>
          <div>
          <Image src={image2} alt="Image billets" priority="true" placeholder="blur" />
          </div>
        </Card.Body>
      </Card>
      </Col>
      </Row>
      </Container>
    </div>
  );
}

export default HomePage;
