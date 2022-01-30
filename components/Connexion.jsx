import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Card, Container, Form, Button, Row, Col } from 'react-bootstrap';
import LoginContext from '../contexts/loginContext';
import styles from '../styles/Connexion.module.css';
import axios from 'axios';

function Connexion() {
  const ConnectSchema = Yup.object().shape({
    email: Yup.string().required('⚠ Un Email est requis').email('⚠ Email invalide'),
    password: Yup.string().required('⚠ Mot de passe requis').min(8, '⚠ Minimum de 8 caractères').max(50, '⚠ Maximum de 50 caractères'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ConnectSchema),
  });

  const [account, setAccount] = useState({});
  const { registerLogin } = useContext(LoginContext);

  useEffect(() => {
    if (account.headers) {
      registerLogin(account);
    }
  }, [account]);

  const ConnectSubmit = (user) => {
    axios
      .post('http://localhost:8000/api/auth/login', {
        email: user.email,
        password: user.password,
      })
      .then((res) => setAccount(res));
    alert('Vous êtes désormais connecté(e)');
    reset({
      email: '',
      password: '',
    });
  };

  return (
    <div className={styles.connexion}>
      <Container>
        <Row className="justify-content-md-center">
          <Col md={8}>
            <Card className={styles.card}>
              <h1 className="">BIENVENUE !</h1>
              <hr />
              <p>Connectez-vous grâce à votre adresse e-mail et votre mot de passe.</p>
              <Card.Body>
                <Form onSubmit={handleSubmit(ConnectSubmit)}>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Adresse Email*</Form.Label>
                    <Form.Control {...register('email')} size="sm" type="text" placeholder="Entrez votre adresse email" />
                    <p className={styles.error}>{errors.email && errors.email?.message}</p>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Mot de passe*</Form.Label>
                    <Form.Control {...register('password')} size="sm" type="password" placeholder="Insérez votre mot de passe" />
                    <p className={styles.error}>{errors.password && errors.password?.message}</p>
                  </Form.Group>
                  <p>
                    <Link href="/NewPassword">Mot de passe oublié?</Link>
                  </p>
                  <Button className={styles.button} variant="primary" type="submit">
                    Connexion
                  </Button>
                  <p>
                    Pas encore inscrit(e)? cliquez <Link href="/Inscription">ici</Link>
                  </p>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Connexion;
