import React from 'react';
import { Form, Button, Card, Row, Col} from 'react-bootstrap';
import styles from '../styles/Inscription.module.css';

function Inscription() {

  return (
    <div className={styles.inscription}>
      <Card className={styles.card}>
        <h1 className="">Inscrivez-vous!</h1>
        <Card.Body>
          <Form>
              <Row>
            <Form.Group as={Col} className="mb-3" controlId="Checkbox">
              <Form.Check type="checkbox" label="Madame" />
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="Checkbox">
              <Form.Check type="checkbox" label="Monsieur" />
            </Form.Group>
              </Row>
            <Form.Group className="mb-3" controlId="lastname">
              <Form.Label>Nom*</Form.Label>
              <Form.Control type="text" placeholder="Entrez votre Nom" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="firstname">
              <Form.Label>Prénom*</Form.Label>
              <Form.Control type="text" placeholder="Entrez votre Prénom" />
            </Form.Group>
            <Form.Group className="mb-3" size="sm" controlId="nickname">
              <Form.Label>Nom d'utilisateur</Form.Label>
              <Form.Control type="text" placeholder="Entrez votre pseudo" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="mail-address">
              <Form.Label>Adresse postale</Form.Label>
              <Form.Control type="text" placeholder="Entrez votre adresse postale" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="postal-code">
              <Form.Label>Code postal</Form.Label>
              <Form.Control type="text" placeholder="Entrez le code postal" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Adresse Email*</Form.Label>
              <Form.Control type="text" placeholder="Entrez votre adresse email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Mot de passe*</Form.Label>
              <Form.Control type="password" placeholder="Insérez votre mot de passe" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password-check">
              <Form.Label>Confirmez Mot de passe*</Form.Label>
              <Form.Control type="password" placeholder="Vérification de votre mot de passe" />
            </Form.Group>

            <Button variant="primary" type="submit">
              S'inscrire
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Inscription;
