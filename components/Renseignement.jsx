import React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Card, Container, Form, Button, Row, Col } from 'react-bootstrap';
import styles from '../styles/Contact.module.css';

function Renseignement() {
  const ConnectSchema = Yup.object().shape({
    email: Yup.string().required('⚠ Un Email est requis').email('⚠ Email invalide'),
    password: Yup.string().required('⚠ Mot de passe requis').min(8, '⚠ Minimum de 8 caractères').max(50, '⚠ Maximum de 50 caractères'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ConnectSchema),
  });

  const ConnectSubmit = (data) => {
    console.log(JSON.stringify(data, null, 2));
  };

  return (
    <div className={styles.connexion}>
      <Container>
        <Row className="justify-content-md-center">
          <Col md={8}>
            <Card className={styles.card}>
              <h1 className="">FORMULAIRE DE CONTACT</h1>
              <p>N&#039;hesitez pas à nous contacter pour plus d&#039;informations .</p>
              <Card.Body>
                <Form onSubmit={handleSubmit(ConnectSubmit)}>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Adresse Email*</Form.Label>
                    <Form.Control {...register('email')} size="sm" type="text" placeholder="Entrez votre adresse email" />
                    <p className={styles.error}>{errors.email && errors.email?.message}</p>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Nom</Form.Label>
                    <Form.Control {...register('password')} size="sm" type="password" placeholder="Entrez votre nom" />
                    <p className={styles.error}>{errors.password && errors.password?.message}</p>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Sujet</Form.Label>
                    <Form.Control {...register('password')} size="sm" type="password" placeholder="Le sujet de votre demande" />
                    <p className={styles.error}>{errors.password && errors.password?.message}</p>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Message</Form.Label>
                    <Form.Control {...register('password')} size="sm" type="password" placeholder="Votre message" />
                    <p className={styles.error}>{errors.password && errors.password?.message}</p>
                  </Form.Group>

                  <Button className={styles.button} variant="primary" type="submit">
                    Envoyez
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Renseignement;
