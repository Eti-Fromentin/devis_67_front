import React, { useEffect, useState, useContext } from 'react';
import LoginContext from '../contexts/loginContext';
import { Accordion, Spinner } from 'react-bootstrap';
import styles from '../styles/EspaceClient.module.css';

function UserProfile() {
  const [userTabs, setUserTabs] = useState(1);
  const { userData, getUserData, isLogin } = useContext(LoginContext);

  useEffect(() => {
    if (isLogin) {
      getUserData();
    }
  }, []);

  const userDataTab = () => {
    setUserTabs(1);
  };
  const devisTab = () => {
    setUserTabs(2);
  };

  return (
    <div>
      {!isLogin && !userData.id ? (
        <div className={styles.spinnerContainer}>
          <Spinner animation="border" />
        </div>
      ) : (
        <div className={styles.profileContainer}>
          <div className={styles.tabs}>
            <button className={styles.button} onClick={userDataTab}>
              Mes informations
            </button>
            <button className={styles.button} onClick={devisTab}>
              Mes devis
            </button>
          </div>
          {userTabs &&
            (userTabs === 1 ? (
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
            ) : (
              <div className={styles.profileMain}>
                {!userData && !userData.devis.length ? (
                  <p>Aucun devis effectué</p>
                ) : (
                  userData.devis.map((elt) => (
                <li>
                  <div className={styles.headerDevis}>
                <p>Devis du {elt.created_at.slice(0, 10)}</p>
                <p>Catégorie: {elt.categories_devis_provider.title}</p>
                <p>Statut : {elt.status === 0 ? "Envoyé" : "en cours de traitement"}</p>
                  </div>
                <Accordion>
                <Accordion.Header>Détails</Accordion.Header>
                <Accordion.Body>
                {elt.questions_answers.map((elt) => 
                <div className={styles.profileDevis}>
                  <p>Question: {elt.questions}</p>
                  <p>Réponse: {elt.answers}</p>
                </div>
                )}
                </Accordion.Body>
                </Accordion>
                </li>
                  ))
                  )}
              </div>
            ))}
    </div>)
}
</div>)};

export default UserProfile;
