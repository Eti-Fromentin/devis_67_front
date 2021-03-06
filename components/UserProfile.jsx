import React, { useEffect, useContext } from 'react';
import { Accordion, Table, Tabs, Tab, Spinner } from 'react-bootstrap';

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
              <div className={styles.ButtonMain}>
                <button className={styles.ButtonLogOut} onClick={handleLogOutClick}>
                  Déconnexion
                </button>
              </div>
              <main className={styles.wrapperDataInfosUser}>
                <Tabs defaultActiveKey="UserProfile" id="uncontrolled-tab-example" className={styles.tabsContainerUserProfile}>
                  <Tab eventKey="UserProfile" title="Mes Informations" className={styles.sousTabContainer}>
                    <div className={styles.profileData}>
                      <Table responsive="sm" striped bordered hover className={styles.tabContainerInfo}>
                        <thead>
                          <tr>
                            <th>Prénom</th>
                            <th>Nom</th>
                            <th>Email</th>
                            <th>Téléphone</th>
                            <th>Adresse</th>
                            <th>Code Postal</th>
                            <th>Ville</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{userData && userData.firstname}</td>
                            <td>{userData && userData.lastname}</td>
                            <td>{userData && userData.email}</td>
                            <td>{userData && userData.phone ? userData.phone : 'non renseigné'}</td>
                            <td>{userData && userData.address ? userData.address : 'non renseigné'}</td>
                            <td>{userData && userData.postalcode}</td>
                            <td>{userData && userData.city}</td>
                          </tr>
                        </tbody>
                      </Table>
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
                  <Tab eventKey="UserMessages" title="Mes Messages" className={styles.messageTabContainer}>
                    <div className={styles.profileMessages}>
                      {!userData && !userData.messages.length ? (
                        <p>Aucun message envoyé</p>
                      ) : (
                        userData.messages.map((elt, index) => (
                          <div key={index} className={styles.headerMessages}>
                            <Table striped bordered hover>
                              <thead>
                                <tr>
                                  <th id={styles.date}>Date</th>
                                  <th id={styles.sujet}>Sujet</th>
                                  <th id={styles.message}>Message</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td id={styles.dateData}>{elt.created_at.slice(0, 10)}</td>
                                  <td id={styles.sujetData}>{elt.subject}</td>
                                  <td id={styles.messageData}>{elt.text}</td>
                                </tr>
                              </tbody>
                            </Table>
                          </div>
                        ))
                      )}
                    </div>
                  </Tab>
                </Tabs>
              </main>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default UserProfile;
