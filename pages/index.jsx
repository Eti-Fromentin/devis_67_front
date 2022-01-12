import React from 'react';
import Image from 'next/image';
import image1 from '../Assets/artisan.jpg';
import image2 from '../Assets/aides.jpg';
import Link from 'next/link';
import { Card, Container, Row, Col } from 'react-bootstrap';
import styles from '../styles/HomePage.module.css';
import NavBar from '../components/NavBar';

function HomePage() {
  return (
    <div>
      <NavBar pageType="devis" />
      <div className={styles.home}>
        <Container className={styles.containerHomepage}>
          <Row>
            <Col md={{ order: 'first' }}>
              <Card className={styles.homecard1}>
                <Card.Title className={styles.cardTitleHome}>Formulaire Devis</Card.Title>
                <Card.Body>
                  <Card.Text className={styles.cardtexthome}>
                    Trouvez l&#039; artisan qu&#039; il vous faut et demandez un devis <Link href="/devis">ici</Link>
                  </Card.Text>
                  <div className={styles.homeImage1}>
                    <Image width={250} height={220} src={image1} alt="Image artisan" priority="true" placeholder="blur" />
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={{ order: 'second' }}>
              <Card className={styles.homecard2}>
                <Card.Title className={styles.cardTitleHome}>Calcul des Aides</Card.Title>
                <Card.Body>
                  <Card.Text className={styles.cardtexthome}>
                    Estimez le montant de vos aides à la rénovation <Link href="/aides">ici</Link>
                  </Card.Text>
                  <div className={styles.homeImage2}>
                    <Image src={image2} width={250} height={220} alt="Image billets" priority="true" placeholder="blur" />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default HomePage;
