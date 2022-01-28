import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import NavBar from '../components/NavBar';
import styles from '../styles/Inscription.module.css';

function Inscription() {
  const validationSchema = Yup.object().shape({
    firstname: Yup.string()
      .required('⚠ Le Prénom est requis')
      .max(45)
      .matches(/^[aA-zZ]+$/, 'lettres majuscule ou miniscule uniquement'),
    lastname: Yup.string()
      .required('⚠ Le Nom est requis')
      .max(45)
      .matches(/^[aA-zZ]+$/, 'lettres majuscule ou miniscule uniquement'),
    phone: Yup.string().max(15).nullable().notRequired(),
    address: Yup.string().max(100).nullable().notRequired(),
    postalCode: Yup.number().positive().required('⚠ Un code postal est requis'),
    city: Yup.string().max(255).required('⚠ Une ville est requise'),
    email: Yup.string().required('⚠ Un Email est requis').max(60).email('⚠ Email invalide'),
    password: Yup.string().required('⚠ Mot de passe requis').min(8, '⚠ Minimum de 8 caractères').max(50, '⚠ Maximum de 50 caractères'),
    confirmPassword: Yup.string()
      .required('⚠ Veuillez confirmer votre mot de passe')
      .oneOf([Yup.ref('password'), null], '⚠ Le mot de passe ne correspond pas'),
    acceptTerms: Yup.bool().oneOf([true], '⚠ Veuillez accepter les conditions'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const formSubmit = (data) => {
    axios.post('http://localhost:8000/api/user', {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      phone: data.phone.length === 0 ? null : data.phone,
      address: data.address.length === 0 ? null : data.address,
      postalcode: data.postalCode,
      city: data.city,
      password: data.password,
    });
    axios
      .post('http://localhost:8000/api/auth/login', {
        email: data.email,
        password: data.password,
      })
      .then((res) => localStorage.setItem('AccessToken', res.headers.accesstoken));
      alert("Merci, votre inscription a bien été prise en compte!");
    reset({
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      address: '',
      postalCode: '',
      city: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    });
  };

  return (
    <div>
      <NavBar pageType="devis" />
      <div className={styles.inscription}>
        <Container>
          <Row className="justify-content-md-center">
            <Col md={8}>
              <Card className={styles.card}>
                <h1 className="">Inscrivez-vous !</h1>
                <hr />
                <p>*Donnée obligatoire</p>
                <Card.Body>
                  <Form onSubmit={handleSubmit(formSubmit)}>
                    <Form.Group className="mb-3" controlId="firstname">
                      <Form.Label>Prénom*</Form.Label>
                      <Form.Control {...register('firstname')} size="sm" type="text" placeholder="Entrez votre Prénom" />
                      <p>{errors.firstname && errors.firstname?.message}</p>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="lastname">
                      <Form.Label>Nom*</Form.Label>
                      <Form.Control {...register('lastname')} size="sm" type="text" placeholder="Entrez votre Nom" />
                      <p>{errors.lastname && errors.lastname?.message}</p>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="email">
                      <Form.Label>Adresse Email*</Form.Label>
                      <Form.Control {...register('email')} size="sm" type="text" placeholder="Entrez votre adresse email" />
                      <p>{errors.email && errors.email?.message}</p>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="phone">
                      <Form.Label>Téléphone</Form.Label>
                      <Form.Control {...register('phone')} size="sm" type="text" placeholder="Entrez votre numéro de téléphone" />
                      <p>{errors.phone && errors.phone?.message}</p>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="mail-address">
                      <Form.Label>Adresse postale</Form.Label>
                      <Form.Control {...register('address')} size="sm" type="text" placeholder="Entrez votre adresse postale" />
                      <p>{errors.address && errors.address?.message}</p>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="postal-code">
                      <Form.Label>Code postal*</Form.Label>
                      <Form.Control {...register('postalCode')} size="sm" type="text" placeholder="Entrez le code postal" />
                      <p>{errors.postalCode && errors.postalCode?.message}</p>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="city">
                      <Form.Label>Ville*</Form.Label>
                      <Form.Control {...register('city')} size="sm" type="text" placeholder="Entrez la ville" />
                      <p>{errors.city && errors.city?.message}</p>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                      <Form.Label>Mot de passe*</Form.Label>
                      <Form.Control {...register('password')} size="sm" type="password" placeholder="Insérez votre mot de passe" />
                      <p>{errors.password && errors.password?.message}</p>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="ConfirmPassword">
                      <Form.Label>Confirmez Mot de passe*</Form.Label>
                      <Form.Control {...register('confirmPassword')} size="sm" type="password" placeholder="Confirmez votre mot de passe" />
                      <p>{errors.confirmPassword && errors.confirmPassword?.message}</p>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="Checkbox">
                      <Form.Check {...register('acceptTerms')} type="checkbox" label="Accepter conditions d'utilisations et mentions légales" />
                      <p>{errors.acceptTerms && errors.acceptTerms?.message}</p>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      S&#039;inscrire
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
