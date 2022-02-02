import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import LoginContext from '../../contexts/loginContext';
import styles from '../../styles/UserDisplay.module.css';
import UserTable from './UserTable';

function UserDisplay() {
  const [usersData, setUsersData] = useState([]);
  const { userId, adminToken } = useContext(LoginContext);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  async function getUsersData() {
    const data = await axios({
      method: 'get',
      url: `${apiUrl}/user/admin/${userId}`,
      headers: {
        Authorization: `Bearer ${adminToken}`,
        'Content-Type': 'application/json',
      },
    });
    setUsersData(data.data);
    console.log(usersData);
  }

  useEffect(() => {
    getUsersData();
  }, []);

  return (
    <div className={styles.userDisplayContainer}>
      {!usersData.length ? (
        <div className={styles.spinnerContainer}>
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <UserTable usersData={usersData} />
        </>
      )}
    </div>
  );
}

export default UserDisplay;
