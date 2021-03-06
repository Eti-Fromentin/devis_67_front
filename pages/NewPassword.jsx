import React from 'react';
import Link from 'next/link';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

import styles from '../styles/NewPassword.module.css';

function NewPassword() {
  const ConnectSchema = Yup.object().shape({
    email: Yup.string().required('⚠ Un Email est requis').email('⚠ Email invalide'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ConnectSchema),
  });

  const ConnectSubmit = () => {
    alert('Le lien vient de vous être envoyé par email');
  };

  return (
    <div>
      <NavBar pageType="devis" />
      <div className={styles.connexion}>
        <Container>
          <Row className="justify-content-md-center">
            <Col md={8}>
              <Card className={styles.card}>
                <h1 className="">Récupérer mon mot de passe</h1>
                <hr />
                <p>Renseignez votre email ci-dessous.</p>
                <p>Nous vous enverrons un lien pour récupérer votre accès à votre compte Devis67</p>
                <Card.Body>
                  <Form onSubmit={handleSubmit(ConnectSubmit)}>
                    <Form.Group className="mb-3" controlId="email">
                      <Form.Label>Adresse Email*</Form.Label>
                      <Form.Control {...register('email')} size="sm" type="text" placeholder="Entrez votre adresse email" />
                      <p className={styles.error}>{errors.email && errors.email?.message}</p>
                    </Form.Group>
                    <Button className={styles.button} variant="primary" type="submit">
                      Envoyer le lien
                    </Button>
                    <p>
                      <Link href="/espace-client">Revenir à la connexion</Link>
                    </p>
                  </Form>
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

export default NewPassword;
