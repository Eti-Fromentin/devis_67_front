import React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Card, Container, Form, Button, Row, Col } from 'react-bootstrap';
import styles from '../styles/Contact.module.css';

function Renseignement() {
  const ConnectSchema = Yup.object().shape({
    email: Yup.string().required('⚠ Un Email est requis').max(60, '⚠ Maximum de 60 caractères').email('⚠ Email invalide'),
    lastname: Yup.string().required('⚠ Un nom est requis').matches(/^[aA-zZ]+$/, 'lettres majuscule ou miniscule uniquement').max(45, '⚠ Maximum de 45 caractères'),
    subject: Yup.string().required('⚠ Un sujet est requis').max(100, '⚠ Maximum de 100 caractères'),
    message: Yup.string().required('⚠ Un message est requis').max(255, '⚠ Maximum de 255 caractères'),
    
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
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Nom</Form.Label>
                    <Form.Control {...register('lastname')} size="sm" type="text" placeholder="Entrez votre nom" />
                    <p className={styles.error}>{errors.lastname && errors.lastname?.message}</p>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="subject">
                    <Form.Label>Sujet</Form.Label>
                    <Form.Control {...register('subject')} size="sm" type="text" placeholder="Le sujet de votre demande" />
                    <p className={styles.error}>{errors.subject && errors.subject?.message}</p>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="message">
                    <Form.Label>Message</Form.Label>
                    <Form.Control {...register('message')} size="sm" type="text" placeholder="Votre message" />
                    <p className={styles.error}>{errors.message && errors.message?.message}</p>
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
