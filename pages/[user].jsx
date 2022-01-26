import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/UserProfile.module.css';


function UserProfile() {

    const [userTabs, setUserTabs] = useState();
    
    const userData = () => {
        setUserTabs(1)
    }
    const devis = () => {
        setUserTabs(2)
    }
    
    // const [userData, setUserData] = useState();
    // useEffect(() => {
    //     axios
    //       .get('http://localhost:8000/api/user/:id')
    //       .then((res) => setUserData(res))
    //   }, []);

  return (
      <div className={styles.profileContainer}>
      <div className={styles.profileHead}>
        Bienvenue ... !
    </div>
    <div className={styles.tabs}>
    <button className={styles.button} onClick={userData}>Mes informations</button>
    <button className={styles.button} onClick={devis}>Mes devis</button>
    </div>
      {userTabs && (userTabs === 1 ?
        (<div className={styles.profileData}>
        <ul>
            <li> Prénom: </li>
            <li> Nom: </li>
            <li> Email: </li>
            <li> Téléphone: </li>
            <li> Adresse: </li>
            <li> Code Postal: </li>
            <li> Ville: </li>
        </ul>

        </div>) : (
            <div className={styles.profileMain}>
              vos récentes demandes de devis
      </div>))}
    </div>
  );
}

export default UserProfile;
