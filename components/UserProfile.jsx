import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import LoginContext from '../contexts/loginContext';
import { Spinner } from 'react-bootstrap';
import styles from '../styles/EspaceClient.module.css';

function UserProfile() {
  const [userTabs, setUserTabs] = useState(1);
  const { userId, userToken } = useContext(LoginContext);
  const [userPersonnalData, setUserPersonnalData] = useState({});

  const userData = () => {
    setUserTabs(1);
  };
  const devis = () => {
    setUserTabs(2);
  };

  useEffect(() => {
    axios({
      method: 'get',
      url: `http://localhost:8000/api/user/${userId}`,
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.data)
      .then((data) => setUserPersonnalData(data));
  }, [userId, userToken]);

  return (
    <div>
      {!userPersonnalData.id ? (
        <div className={styles.spinnerContainer}>
          <Spinner animation="border" />
        </div>
      ) : (
        <div className={styles.profileContainer}>
          <div className={styles.tabs}>
            <button className={styles.button} onClick={userData}>
              Mes informations
            </button>
            <button className={styles.button} onClick={devis}>
              Mes devis
            </button>
          </div>
          {userTabs &&
            (userTabs === 1 ? (
              <div className={styles.profileData}>
                <ul>
                  <li> Prénom: {userPersonnalData.firstname} </li>
                  <li> Nom: {userPersonnalData.lastname}</li>
                  <li> Email: {userPersonnalData.email}</li>
                  <li> Téléphone: {userPersonnalData.phone ? userPersonnalData.phone : 'non renseigné'}</li>
                  <li> Adresse: {userPersonnalData.address ? userPersonnalData.address : 'non renseigné'}</li>
                  <li> Code Postal: {userPersonnalData.postalcode}</li>
                  <li> Ville: {userPersonnalData.city}</li>
                </ul>
              </div>
            ) : (
              <div className={styles.profileMain}>
                <li>Devis du 15/01/2022</li>
                <li>Devis du 25/09/2021</li>
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
