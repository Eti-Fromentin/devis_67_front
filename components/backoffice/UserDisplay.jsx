import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { Spinner } from 'react-bootstrap';
import LoginContext from '../../contexts/loginContext';
import styles from '../../styles/UserDisplay.module.css';
import UserTable from './UserTable';

function UserDisplay() {
  const [usersData, setUsersData] = useState([]);
  const { isLogin, userId, userToken, checkIsLogin } = useContext(LoginContext);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  async function getUsersData() {
    if (!isLogin) {
      await checkIsLogin();
    }
    if (isLogin) {
      const data = await axios({
        method: 'get',
        url: `${apiUrl}/user/admin/${userId}`,
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      });
      setUsersData(data.data);
      console.log(usersData);
    }
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
