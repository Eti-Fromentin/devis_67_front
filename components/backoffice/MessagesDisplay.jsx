import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import LoginContext from '../../contexts/loginContext';
import styles from '../../styles/Tables.module.css';
import MessagesTable from './MessagesTable';

function MessagesDisplay() {
  const { userId, adminToken } = useContext(LoginContext);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [messagesData, setMessagesData] = useState([]);

  async function getMessagesData() {
    const data = await axios({
      method: 'get',
      url: `${apiUrl}/message/admin/${userId}`,
      headers: {
        Authorization: `Bearer ${adminToken}`,
        'Content-Type': 'application/json',
      },
    });
    setMessagesData(data.data);
  }

  async function updateMessage(id, value) {
    await axios({
      method: 'put',
      url: `${apiUrl}/message/admin/${userId}`,
      headers: {
        Authorization: `Bearer ${adminToken}`,
        'Content-Type': 'application/json',
      },
      data: {
        id: id,
        statut: value,
      },
    });
  }

  useEffect(() => {
    getMessagesData();
  }, []);

  return (
    <div className={styles.userDisplayContainer}>
      {!messagesData.length ? (
        <div className={styles.spinnerContainer}>
          <Spinner animation="border" />
        </div>
      ) : (
        <>{messagesData.length && <MessagesTable messagesData={messagesData} updateMessage={updateMessage} />}</>
      )}
    </div>
  );
}

export default MessagesDisplay;
