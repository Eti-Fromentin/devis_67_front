import React from 'react';
//import axios from 'axios';
import Image from 'next/image';
import Head from 'next/head';
import image1 from '../Assets/artisan.jpg';
import image2 from '../Assets/aides.jpg';
import Link from 'next/link';
import { Card, Container, Row, Col } from 'react-bootstrap';
import styles from '../styles/HomePage.module.css';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

function HomePage() {
  return (
    <div>
      <Head>
        <title>My title</title>
        <meta content="My page title" key="title" />
      </Head>
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
                    Estimez le montant de vos aides à la rénovation <Link href="/aide">ici</Link>
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
      <Footer pageType="devis" />
    </div>
  );
}
//export async function getStaticProps() {
// const params = props.match.params;
// <Switch>
// <Route path="/:year/:month" component={PostList} />
// <Switch>
// <Route path="/:year/:month" component={PostList} />
//   const posts = await axios
//     .get('http://localhost:8000/api/pages')
//     .then((response) => response.data)
//     .then((data) => data.filter((element) => element.url === params));

//   return {
//     params: {
//       posts,
//     },
//   };
// }

export default HomePage;
