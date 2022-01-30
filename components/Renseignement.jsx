import React, { useEffect, useContext } from 'react';
// import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import LoginContext from '../contexts/loginContext';
import { Card, Container, Form, Button, Row, Col } from 'react-bootstrap';
import styles from '../styles/Contact.module.css';
import axios from 'axios';

function Renseignement() {
  const { isLogin, checkIsLogin, getUserData, userData } = useContext(LoginContext);

  useEffect(() => {
    checkIsLogin();
    if (isLogin) {
      getUserData();
    }
  }, [isLogin]);

  const ConnectSchema = Yup.object().shape({
    email: Yup.string().required('⚠ Un Email est requis').max(55, '⚠ Maximum de 55 caractères').email('⚠ Email invalide'),
    name: Yup.string()
      .required('⚠ Un nom est requis')
      .matches(/^[aA-zZ]+$/, 'lettres majuscule ou minuscule uniquement')
      .max(55, '⚠ Maximum de 55 caractères'),
    subject: Yup.string().required('⚠ Un sujet est requis').max(45, '⚠ Maximum de 45 caractères'),
    message: Yup.string().required('⚠ Un message est requis').max(1000, '⚠ Maximum de 1000 caractères'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ConnectSchema),
  });

  const formSubmit = async (data) => {
    await axios
      .post(`http://localhost:8000/api/message`, {
        user_id: !isLogin && !userData ? null : userData.id,
        subject: data.subject,
        text: data.message,
        sender_name: data.name,
        sender_email: data.email,
      })
      .then(alert('Merci, votre message a bien été envoyé'));
    reset({
      name: '',
      email: '',
      subject: '',
      message: '',
      acceptTerms: false,
    });
  };

  return (
    <div className={styles.connexion}>
      <Container>
        <Row className="justify-content-md-center">
          <Col md={8}>
            <Card className={styles.card}>
              <h1 className="">FORMULAIRE DE CONTACT</h1>
              <p>N&#039;hesitez pas à nous contacter pour plus d&#039;informations.</p>
              <Card.Body>
                <Form onSubmit={handleSubmit(formSubmit)}>
                  <Form.Group className="mb-3" controlId="email" key="email1">
                    <Form.Label>Adresse Email*</Form.Label>
                    <Form.Control
                      {...register('email')}
                      size="sm"
                      type="text"
                      placeholder="Entrez votre adresse email"
                      defaultValue={userData && userData.email}
                    />
                    <p className={styles.error}>{errors.email && errors.email?.message}</p>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="name" key="name1">
                    <Form.Label>Nom*</Form.Label>
                    <Form.Control
                      {...register('name')}
                      size="sm"
                      type="text"
                      placeholder="Entrez votre nom"
                      defaultValue={userData && userData.lastname}
                    />
                    <p className={styles.error}>{errors.lastname && errors.lastname?.message}</p>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="subject">
                    <Form.Label>Sujet*</Form.Label>
                    <Form.Control {...register('subject')} size="sm" type="text" placeholder="Le sujet de votre demande" />
                    <p className={styles.error}>{errors.subject && errors.subject?.message}</p>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="message">
                    <Form.Label>Message*</Form.Label>
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
