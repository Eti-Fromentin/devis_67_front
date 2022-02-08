import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import LoginContext from '../../contexts/loginContext';
import styles from '../../styles/Tables.module.css';
import NavbarTable from './NavbarTable';

function NavbarDisplay() {
  const [navbarData, setNavbarData] = useState([]);
  const [urls, setUrls] = useState([]);
  const { userId, adminToken } = useContext(LoginContext);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  async function getNavbarData() {
    const data = await axios({
      method: 'get',
      url: `${apiUrl}/navbar/admin/${userId}`,
      headers: {
        Authorization: `Bearer ${adminToken}`,
        'Content-Type': 'application/json',
      },
    });
    setNavbarData(data.data);
  }

  async function getUrlData() {
    const data = await axios({
      method: 'get',
      url: `${apiUrl}/pagesdetails/admin/${userId}`,
      headers: {
        Authorization: `Bearer ${adminToken}`,
        'Content-Type': 'application/json',
      },
    });
    setUrls(data.data);
  }

  useEffect(() => {
    getNavbarData();
    getUrlData();
  }, []);

  return (
    <div className={styles.userDisplayContainer}>
      {!navbarData.length || !urls.length ? (
        <div className={styles.spinnerContainer}>
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <NavbarTable navbarData={navbarData} setNavbarData={setNavbarData} urls={urls} getNavbarData={getNavbarData} refresData={getNavbarData} />
        </>
      )}
    </div>
  );
}

export default NavbarDisplay;
