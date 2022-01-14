import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';
import NavBar from '../components/NavBar';
import styles from '../styles/Inscription.module.css';

function Inscription() {

  const [userData, setUserData] = useState([]);

  const CreateUser = () => {
      axios.post('http://localhost:8000/api/user')
      .then(response => response.data(setUserData)), []};


    const validationSchema = Yup.object().shape({
        lastname: Yup.string()
        .required('⚠ Le Nom est requis'),
        firstname: Yup.string().required('⚠ Le Prénom est requis'),
        username: Yup.string()
          .required('⚠ Le nom utilisateur est requis')
          .min(6, '⚠ Minimum de 6 caractères')
          .max(20, '⚠ Maximum de 20 caractères'),
        address: Yup.string().required('⚠ Une adresse postale est requise'),
        postalCode: Yup.string().required('⚠ Un code postal est requis'),
        email: Yup.string()
          .required('⚠ Un Email est requis')
          .email('⚠ Email invalide'),
        password: Yup.string()
          .required('⚠ Mot de passe requis')
          .min(6, '⚠ Minimum de 6 caractères')
          .max(40, '⚠ Maximum de 40 caractères'),
        confirmPassword: Yup.string()
          .required('⚠ Veuillez confirmer votre mot de passe')
          .oneOf([Yup.ref('password'), null], '⚠ Le mot de passe ne correspond pas'),
        acceptTerms: Yup.bool().oneOf([true], '⚠ Veuillez accepter les conditions')
      });
    
      const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm({
        resolver: yupResolver(validationSchema)
      });
    
      const formSubmit = data => {
        console.log(JSON.stringify(data, null, 2));
      };
  
    return (
      <div>
        <NavBar pageType="devis" />
      <div className={styles.inscription}>
        <Container>
          <Row className="justify-content-md-center">
            <Col md={8}>
              <Card className={styles.card}>
                <h1 className="">Inscrivez-vous!</h1>
                <Card.Body>
                  <Form onSubmit={handleSubmit(formSubmit)}>
                    <Row>
                      <Form.Group as={Col} className="mb-3" controlId="Checkbox">
                        <Form.Check type="checkbox" label="Madame" />
                      </Form.Group>
                      <Form.Group as={Col} className="mb-3" controlId="Checkbox">
                        <Form.Check type="checkbox" label="Monsieur"/>
                      </Form.Group>
                      <Form.Group as={Col} className="mb-3" controlId="Checkbox">
                        <Form.Check type="checkbox" label="Non renseigné"/>
                      </Form.Group>
                    </Row>
                    <Form.Group className="mb-3" controlId="lastname">
                      <Form.Label>Nom*</Form.Label>
                      <Form.Control {...register("lastname")} size="sm" type="text" placeholder="Entrez votre Nom" />
                      <p>{errors.lastname && errors.lastname?.message}</p>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="firstname">
                      <Form.Label>Prénom*</Form.Label>
                      <Form.Control  {...register("firstname")} size="sm" type="text" placeholder="Entrez votre Prénom" />
                      <p>{errors.firstname && errors.firstname?.message}</p>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="nickname">
                      <Form.Label>Nom d'utilisateur*</Form.Label>
                      <Form.Control {...register("username")} size="sm" type="text" placeholder="Entrez votre pseudo" />
                      <p>{errors.username && errors.username?.message}</p>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="mail-address">
                      <Form.Label>Adresse postale*</Form.Label>
                      <Form.Control {...register("address")} size="sm" type="text" placeholder="Entrez votre adresse postale" />
                      <p>{errors.address && errors.address?.message}</p>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="postal-code">
                      <Form.Label>Code postal*</Form.Label>
                      <Form.Control {...register("postalCode")} size="sm" type="text" placeholder="Entrez le code postal" />
                      <p>{errors.postalCode && errors.postalCode?.message}</p>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="email">
                      <Form.Label>Adresse Email*</Form.Label>
                      <Form.Control {...register("email")} size="sm" type="text" placeholder="Entrez votre adresse email" />
                      <p>{errors.email && errors.email?.message}</p>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                      <Form.Label>Mot de passe*</Form.Label>
                      <Form.Control {...register("password")} size="sm" type="password" placeholder="Insérez votre mot de passe" />
                      <p>{errors.password && errors.password?.message}</p>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password-check">
                      <Form.Label>Confirmez Mot de passe*</Form.Label>
                      <Form.Control {...register("confirmPassword")} size="sm" type="password" placeholder="Vérification mot de passe" />
                      <p>{errors.confirmPassword && errors.confirmPassword?.message}</p>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="Checkbox">
                      <Form.Check
                        {...register("acceptTerms")}
                        type="checkbox"
                        label="Accepter conditions d'utilisations et mentions légales"
                      />
                      <p>{errors.acceptTerms && errors.acceptTerms?.message}</p>
                    </Form.Group>
  
                    <Button variant="primary" type="submit" onClick={CreateUser}>
                      S'inscrire
                    </Button>
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
  
  export default Inscription;