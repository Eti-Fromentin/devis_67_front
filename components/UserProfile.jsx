import React, { useEffect, useContext } from 'react';
import LoginContext from '../contexts/loginContext';

import { Accordion, Button, Tabs, Tab, Spinner } from 'react-bootstrap';
import styles from '../styles/UserProfile.module.css';


function UserProfile() {
  const { userData, getUserData, isLogin, logOut } = useContext(LoginContext);

  useEffect(() => {
    if (isLogin) {
      getUserData();
    }
  }, []);

  const handleLogOutClick = () => {
    logOut();
    alert('Vous êtes maintenant déconnecté.');
  };

  return (
    <div>
      {!isLogin && !userData.id ? (
        <div className={styles.spinnerContainer}>
          <Spinner animation="border" />
        </div>
      ) : (
        <div>
          {userData && (
            <div className={styles.profileContainer}>
              <h1 id={styles.welcomeUser}>BIENVENU(E) {userData.firstname} {userData.lastname}</h1>
              <Tabs defaultActiveKey="UserProfile" id="uncontrolled-tab-example" className="justify-content-center">
                <Tab eventKey="UserProfile" title="Mes Informations">
                <Button onClick={handleLogOutClick} variant="primary">
                  Déconnexion
                </Button>
                  <div className={styles.profileData}>
                    <ul>
                      <li> Prénom: {userData && userData.firstname} </li>
                      <li> Nom: {userData && userData.lastname}</li>
                      <li> Email: {userData && userData.email}</li>
                      <li> Téléphone: {userData && userData.phone ? userData.phone : 'non renseigné'}</li>
                      <li> Adresse: {userData && userData.address ? userData.address : 'non renseigné'}</li>
                      <li> Code Postal: {userData && userData.postalcode}</li>
                      <li> Ville: {userData && userData.city}</li>
                    </ul>
                  </div>
                </Tab>
                <Tab eventKey="UserDevis" title="Mes Devis">
                  <div className={styles.profileMain}>
                    {!userData && !userData.devis.length ? (
                      <p>Aucun devis effectué</p>
                    ) : (
                      userData.devis.map((elt) => (
                        <li>
                          <div className={styles.headerDevis}>
                            <p>Devis du {elt.created_at.slice(0, 10)}</p>
                            <p>Catégorie: {elt.categories_devis_provider.title}</p>
                            <p>Statut : {elt.status === 0 ? 'Envoyé' : 'En cours de traitement'}</p>
                          </div>
                          <Accordion>
                            <Accordion.Header>Détails</Accordion.Header>
                            <Accordion.Body>
                              {elt.questions_answers.map((res) => (
                                <div className={styles.profileDevis}>
                                  <p>Question: {res.questions}</p>
                                  <p>Réponse: {res.answers}</p>
                                </div>
                              ))}
                            </Accordion.Body>
                          </Accordion>
                        </li>
                      ))
                    )}
                  </div>
                </Tab>
                <Tab eventKey="UserMessages" title="Mes Messages">
                  <div className={styles.profileMessages}>
                    {!userData && !userData.messages.length ? (
                      <p>Aucun message envoyé</p>
                    ) : (
                      userData.messages.map((elt) => (
                        <div className={styles.headerMessages}>
                          <p>Date {elt.created_at.slice(0, 10)}</p>
                          <p>Sujet: {elt.subject}</p>
                          <p>Message: {elt.text}</p>
                        </div>
                      ))
                    )}
                  </div>
                </Tab>
              </Tabs>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default UserProfile;
