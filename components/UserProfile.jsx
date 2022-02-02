import React, { useEffect, useContext } from 'react';
import { Accordion, Button, Table, Tabs, Tab, Spinner } from 'react-bootstrap';
import LoginContext from '../contexts/loginContext';
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
              <h1 id={styles.welcomeUser}>
                BIENVENU(E) {userData.firstname} {userData.lastname}
              </h1>
              <Button className={styles.ButtonLogOut} onClick={handleLogOutClick} variant="primary">
                Déconnexion
              </Button>
              <Tabs defaultActiveKey="UserProfile" id="uncontrolled-tab-example" className="justify-content-center">
                <Tab eventKey="UserProfile" title="Mes Informations">
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
                      userData.devis.map((elt, index) => (
                        <li key={index}>
                          <div className={styles.headerDevis}>
                            <p>Devis du {elt.created_at.slice(0, 10)}</p>
                            <p>Catégorie: {elt.categories_devis_provider.title}</p>
                            <p>Statut : {elt.status === 0 ? 'Envoyé' : 'En cours de traitement'}</p>
                          </div>
                          <Accordion>
                            <Accordion.Header>Détails</Accordion.Header>
                            <Accordion.Body>
                              {elt.questions_answers.map((res, index) => (
                                <div key={index} className={styles.profileDevis}>
                                  <Table striped bordered hover>
                                    <thead>
                                      <tr>
                                        <th>Question</th>
                                        <th>Réponse</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>{res.questions}</td>
                                        <td>{res.answers}</td>
                                      </tr>
                                    </tbody>
                                  </Table>
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
                      userData.messages.map((elt, index) => (
                        <div key={index} className={styles.headerMessages}>
                          <Table striped bordered hover>
                            <thead>
                              <tr>
                                <th>Date</th>
                                <th>Sujet</th>
                                <th>Message</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>{elt.created_at.slice(0, 10)}</td>
                                <td>{elt.subject}</td>
                                <td>{elt.text}</td>
                              </tr>
                            </tbody>
                          </Table>
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
