import React from 'react';
import Link from 'next/link';
import { Card, Container, Form, Button, Row, Col } from 'react-bootstrap';
import styles from '../styles/Connexion.module.css'


function Connexion() {
  return (
<div className={styles.connexion}>
  <Container>
    <Row className="justify-content-md-center">
      <Col md={8}>
    <Card className={styles.card}>
    <h1 className="">BIENVENUE!</h1>
    <p>Connectez-vous grâce à votre adresse e-mail et votre mot de passe.</p>
        <Card.Body>
            <Form>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Adresse Email*</Form.Label>
              <Form.Control size="sm" type="text" placeholder="Entrez votre adresse email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Mot de passe*</Form.Label>
              <Form.Control size="sm" type="password" placeholder="Insérez votre mot de passe" />
            </Form.Group>
            <p>
            <Link href="">Mot de passe oublié?</Link>
            </p>
            <Button className={styles.button} variant="primary" type="submit">
              Connexion
            </Button>
            <p>Pas encore inscrit(e)? cliquez <Link href="/inscription">ici</Link></p>
            </Form>
        </Card.Body>
    </Card>
    </Col>
    </Row>
    </Container>
    </div>
    );
};

export default Connexion;
