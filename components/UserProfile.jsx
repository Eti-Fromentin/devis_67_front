import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/EspaceClient.module.css';

function UserProfile() {
  const [userTabs, setUserTabs] = useState();

  const userData = () => {
    setUserTabs(1);
  };
  const devis = () => {
    setUserTabs(2);
  };

  // const [userData, setUserData] = useState();
  // useEffect(() => {
  //     axios
  //       .get('http://localhost:8000/api/user/:id')
  //       .then((res) => setUserData(res))
  //   }, []);

  return (
    <div>
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
                <li> Prénom: </li>
                <li> Nom: </li>
                <li> Email: </li>
                <li> Téléphone: </li>
                <li> Adresse: </li>
                <li> Code Postal: </li>
                <li> Ville: </li>
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
    </div>
  );
}

export default UserProfile;