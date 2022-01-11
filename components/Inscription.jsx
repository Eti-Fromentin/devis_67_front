import React from 'react';
import { useState, useEffect } from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import styles from '../styles/Inscription.module.css';

function Inscription() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <div className={styles.inscription}>
      <Container>
        <Row className="justify-content-md-center">
          <Col md={8}>
            <Card className={styles.card}>
              <h1 className="">Inscrivez-vous!</h1>
              <Card.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Row>
                    <Form.Group as={Col} className="mb-3" controlId="Checkbox">
                      <Form.Check required type="checkbox" label="Madame" />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="Checkbox">
                      <Form.Check required type="checkbox" label="Monsieur" 
                        feedback="Veuillez cocher une des deux cases"
                        feedbackType="invalid"/>
                    </Form.Group>
                  </Row>
                  <Form.Group controlId="lastname">
                    <Form.Label>Nom*</Form.Label>
                    <Form.Control required size="sm" type="text" placeholder="Entrez votre Nom" />
                    <Form.Control.Feedback type="invalid">Veuillez renseigner un Nom.</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="firstname">
                    <Form.Label>Prénom*</Form.Label>
                    <Form.Control required size="sm" type="text" placeholder="Entrez votre Prénom" />
                    <Form.Control.Feedback type="invalid">Veuillez renseigner un Prénom.</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" size="sm" controlId="nickname">
                    <Form.Label>Nom d'utilisateur*</Form.Label>
                    <Form.Control required size="sm" type="text" placeholder="Entrez votre pseudo" />
                    <Form.Control.Feedback type="invalid">Veuillez insérer un Nom d'utilisateur.</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="mail-address">
                    <Form.Label>Adresse postale*</Form.Label>
                    <Form.Control required size="sm" type="text" placeholder="Entrez votre adresse postale" />
                    <Form.Control.Feedback type="invalid">Veuillez insérer une adresse postale valide.</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="postal-code">
                    <Form.Label>Code postal*</Form.Label>
                    <Form.Control required size="sm" type="text" placeholder="Entrez le code postal" />
                    <Form.Control.Feedback type="invalid">Veuillez insérer un code postal valide.</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Adresse Email*</Form.Label>
                    <Form.Control required size="sm" type="text" placeholder="Entrez votre adresse email" />
                    <Form.Control.Feedback type="invalid">Veuillez insérer une adresse email valide.</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Mot de passe*</Form.Label>
                    <Form.Control required size="sm" type="password" placeholder="Insérez votre mot de passe" />
                    <Form.Control.Feedback type="invalid">Veuillez insérer un mot de passe valide.</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="password-check">
                    <Form.Label>Confirmez Mot de passe*</Form.Label>
                    <Form.Control required size="sm" type="password" placeholder="Vérification mot de passe" />
                    <Form.Control.Feedback type="invalid">Veuillez confirmer votre mot de passe.</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} className="mb-3" controlId="Checkbox">
                    <Form.Check
                      required
                      type="checkbox"
                      label="Accepter conditions d'utilisations et mentions légales"
                      feedback="Veuillez cocher la case pour vous inscrire."
                      feedbackType="invalid"
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    S'inscrire
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

export default Inscription;
