import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Card, Container, Form, Button, Row, Col } from 'react-bootstrap';

import LoginContext from '../../contexts/loginContext';
import styles from '../../styles/AdminLogin.module.css';

function AdminLogin() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

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

  const [admin, setAdmin] = useState({});
  const { registerAdminLogin } = useContext(LoginContext);

  useEffect(() => {
    if (admin.headers) {
      registerAdminLogin(admin);
    }
  }, [admin]);

  const ConnectSubmit = (user) => {
    axios
      .post(`${apiUrl}/auth/adminlogin`, {
        email: user.email,
        password: user.password,
      })
      .then((res) => {
        if (res.status === 200) {
          setAdmin(res);
          alert('Connexion réussie!');
        }
      })
      .catch((err) => {
        if (err.response) {
          alert('Votre Email ou mot de passe ne correspond pas');
        }
      });
    reset({
      email: '',
      password: '',
    });
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <Card className={styles.card}>
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
                <Button className={styles.button} variant="primary" type="submit">
                  Connexion
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminLogin;
