import React, { useEffect, useState, useContext } from 'react';
import LoginContext from '../contexts/loginContext';
import { Spinner } from 'react-bootstrap';
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
                <li>Devis du {userData && userData.devis[0].created_at}
                <p>Catégorie: {userData && userData.devis[0].categories_devis_provider.title}</p>
                <p>Statut : {userData && userData.devis[0].status === 0 ? "Envoyé" : "en cours de traitement"}</p>
                <p>Question: {userData && userData.devis[0].questions_answers[0].questions}</p>
                <p>Réponse: {userData && userData.devis[0].questions_answers[0].answers}</p>
                </li>
                <li>
                Devis du {userData && userData.devis[1].created_at}
                <p>Catégorie: {userData && userData.devis[1].categories_devis_provider.title}</p>
                <p>Statut : {userData && userData.devis[1].status === 0 ? "Envoyé" : "en cours de traitement"}</p>
                <p>Question: {userData && userData.devis[1].questions_answers[0].questions}</p>
                <p>Réponse: {userData && userData.devis[1].questions_answers[0].answers}</p>
                </li>
                <li>Devis du 18/07/2021</li>
                <li>Devis du 10/04/2021</li>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default UserProfile;
