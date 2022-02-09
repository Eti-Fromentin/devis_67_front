import React from 'react';

import { Offcanvas, ListGroup } from 'react-bootstrap';

import styles from '../../styles/OffCanvas.module.css';

function OffCanvas({ setShowSidebar, showSidebar, handleChoice }) {
  const handleClose = () => setShowSidebar(false);
  const handleClick = (choice) => {
    handleChoice(choice);
    handleClose();
  };
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
              handleClick('devis');
            }}
          >
            Demandes de devis
          </ListGroup.Item>
          <ListGroup.Item
            action
            onClick={() => {
              handleClick('messages');
            }}
          >
            Messages Reçus
          </ListGroup.Item>
          <ListGroup.Item
            action
            onClick={() => {
              handleClick('providers');
            }}
          >
            Artisans
          </ListGroup.Item>
          <ListGroup.Item
            action
            onClick={() => {
              handleClick('users');
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
              handleClick('navbar');
            }}
          >
            Barre de navigation supérieure
          </ListGroup.Item>
          <ListGroup.Item
            action
            onClick={() => {
              handleClick('footer');
            }}
          >
            Barre de navigation inférieure
          </ListGroup.Item>
          <ListGroup.Item
            action
            onClick={() => {
              handleClick('pagescontent');
            }}
          >
            Contenu des Pages
          </ListGroup.Item>
          <ListGroup.Item
            action
            onClick={() => {
              handleClick('homedevis');
            }}
          >
            Contenu de la page d&apos;accueil
          </ListGroup.Item>
          <ListGroup.Item
            action
            onClick={() => {
              handleClick('categories_devis');
            }}
          >
            Catégories d&apos;artisans et devis
          </ListGroup.Item>
          <ListGroup.Item
            action
            onClick={() => {
              handleClick('formdevis');
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
