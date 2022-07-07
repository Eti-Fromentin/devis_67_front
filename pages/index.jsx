import React from 'react';
import axios from 'axios';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { Card, Container, Row, Col } from 'react-bootstrap';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import image1 from '../Assets/artisan.jpg';
import image2 from '../Assets/aides.jpg';
import styles from '../styles/HomePage.module.css';

function HomePage({ headInfo }) {
  const head = headInfo && headInfo[0];
  return (
    <div>
      <Head>
        <title>{head.title}</title>
        <meta name="description" content={head.description} />
        <meta name="keywords" content={head.keywords} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NavBar pageType="devis" />
      <div className={styles.home}>
        <Container className={styles.containerHomepage}>
          <Row className={styles.row}>
            <Link href="devis/">
              <Col md={{ order: 'first' }} className={styles.colHomeCard}>
                <Card className={styles.homecard1}>
                  <Card.Title className={styles.cardTitleHome}>Formulaire Devis</Card.Title>
                  <Card.Body>
                    <Card.Text className={styles.cardtexthome}>
                      <span>Trouvez l&#039;artisan qu&#039;il vous faut et demandez un devis</span>
                    </Card.Text>
                    <div className={styles.homeImage}>
                      <Image
                        width={250}
                        height={220}
                        className={styles.imageHome}
                        src={image1}
                        alt="Image artisan"
                        priority="true"
                        placeholder="blur"
                      />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Link>
            <Link href="aide/">
              <Col md={{ order: 'second' }} className={styles.colHomeCard}>
                <Card className={styles.homecard2}>
                  <Card.Title className={styles.cardTitleHome}>Calcul des Aides</Card.Title>
                  <Card.Body>
                    <Card.Text className={styles.cardtexthome}>
                      <span>Estimez le montant de vos aides à la rénovation !</span>
                    </Card.Text>
                    <div className={styles.homeImage}>
                      <Image
                        src={image2}
                        width={250}
                        height={220}
                        className={styles.imageHome}
                        alt="Image billets"
                        priority="true"
                        placeholder="blur"
                      />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Link>
          </Row>
        </Container>
      </div>
      <Footer pageType="devis" />
    </div>
  );
}

export async function getStaticProps() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const headInfo = await axios.get(`${apiUrl}/pagesdetails/index`).then((response) => response.data);

  return {
    props: {
      headInfo,
    },
  };
}

export default HomePage;
