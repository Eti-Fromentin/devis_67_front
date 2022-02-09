import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';

import UserTable from './UserTable';
import LoginContext from '../../contexts/loginContext';

import styles from '../../styles/Tables.module.css';

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
