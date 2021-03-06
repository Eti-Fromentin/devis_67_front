import React from 'react';
import { useEffect, useState } from 'react';
import { Navbar, Container, Nav, Spinner } from 'react-bootstrap';
import Image from 'next/image';
import axios from 'axios';

import logo from '../Assets/logo.png';
import styles from '../styles/NavBar.module.css';

function NavBar({ pageType }) {
  const [navBarData, setNavBarData] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    axios
      .get(`${apiUrl}/navbar/`)
      .then((reponse) => setNavBarData(reponse.data.filter((element) => element.visible === 1 && element.pagetype === pageType)));
  }, []);

  return (
    <div>
      {!navBarData.length ? (
        <div className={styles.spinnerContainer}>
          <Spinner animation="border" />
        </div>
      ) : (
        <Navbar expand="lg" className={styles.containerNavBar}>
          <Container>
            <Navbar.Brand href="/">
              <Image src={logo} alt="image logo" />
            </Navbar.Brand>
          </Container>
          <Container className={styles.navListContainer}>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {navBarData.length &&
                  navBarData.map((element) => {
                    return (
                      <div key={element.position} className={styles.divNavLinks}>
                        <Nav.Link className={styles.navBarLink} href={element.pages}>
                          {element.text}
                        </Nav.Link>
                      </div>
                    );
                  })}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </div>
  );
}
export default NavBar;
