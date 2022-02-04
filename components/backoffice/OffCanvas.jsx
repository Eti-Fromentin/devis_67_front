import React from 'react';
import { Offcanvas, ListGroup } from 'react-bootstrap';

import styles from '../../styles/OffCanvas.module.css';

function OffCanvas({ setShowSidebar, showSidebar, handleChoice }) {
  const handleClose = () => setShowSidebar(false);
  return (
    <Offcanvas show={showSidebar} onHide={handleClose}>
      <Offcanvas.Header className={styles.offcanvas} closeButton>
        <Offcanvas.Title>Administration Devis 67</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ListGroup className={styles.listContainer}>
          <ListGroup.Item variant="primary">Gestion</ListGroup.Item>
          <ListGroup.Item
            action
            onClick={() => {
              handleChoice('devis');
            }}
          >
            Demandes de devis
          </ListGroup.Item>
          <ListGroup.Item
            action
            onClick={() => {
              handleChoice('messages');
            }}
          >
            Messages Reçus
          </ListGroup.Item>
          <ListGroup.Item
            action
            onClick={() => {
              handleChoice('providers');
            }}
          >
            Artisans
          </ListGroup.Item>
          <ListGroup.Item
            action
            onClick={() => {
              handleChoice('users');
            }}
          >
            Utilisateurs
          </ListGroup.Item>
        </ListGroup>
        <ListGroup className={styles.listContainer}>
          <ListGroup.Item variant="primary">Personnalisation du site</ListGroup.Item>
          <ListGroup.Item
            action
            onClick={() => {
              handleChoice('navbar');
            }}
          >
            Barre de navigation supérieure
          </ListGroup.Item>
          <ListGroup.Item
            action
            onClick={() => {
              handleChoice('footer');
            }}
          >
            Barre de navigation inférieure
          </ListGroup.Item>
          <ListGroup.Item
            action
            onClick={() => {
              handleChoice('pagescontent');
            }}
          >
            Contenu des Pages
          </ListGroup.Item>
          <ListGroup.Item
            action
            onClick={() => {
              handleChoice('homedevis');
            }}
          >
            Contenu de la page d&apos;accueil
          </ListGroup.Item>
          <ListGroup.Item
            action
            onClick={() => {
              handleChoice('categories_devis');
            }}
          >
            Catégories d&apos;artisans et devis
          </ListGroup.Item>
          <ListGroup.Item
            action
            onClick={() => {
              handleChoice('formdevis');
            }}
          >
            Formulaire de demande de devis
          </ListGroup.Item>
        </ListGroup>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default OffCanvas;
