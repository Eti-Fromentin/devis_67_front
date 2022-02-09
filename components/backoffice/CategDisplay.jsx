import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';

import CategTable from './CategTable';

import LoginContext from '../../contexts/loginContext';

import styles from '../../styles/Tables.module.css';

function CategDisplay() {
  const [categData, setCategData] = useState([]);
  const { userId, adminToken } = useContext(LoginContext);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  async function getCategData() {
    const data = await axios({
      method: 'get',
      url: `${apiUrl}/homedevis/categories/admin/${userId}`,
      headers: {
        Authorization: `Bearer ${adminToken}`,
        'Content-Type': 'application/json',
      },
    });
    setCategData(data.data);
  }

  useEffect(() => {
    getCategData();
  }, []);

  return (
    <div>
      {!categData.length ? (
        <div className={styles.spinnerContainer}>
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <CategTable categData={categData} setCategData={setCategData} getCategData={getCategData} />
        </>
      )}
    </div>
  );
}

export default CategDisplay;
