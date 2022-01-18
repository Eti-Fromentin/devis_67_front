import React from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import styles from '../styles/NewPassword.module.css';

function NewPassword () {

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

const ConnectSubmit = (data) => {
  console.log(JSON.stringify(data, null, 2));
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
              <p>Renseignez les informations ci-dessous.</p>
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
  </div>
);
}

export default NewPassword;
