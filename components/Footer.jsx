import React from 'react';
import logo from '../public/logo.png';
import Image from 'next/image';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from '../styles/Footer.module.css';

import { Navbar, Container, Nav } from 'react-bootstrap';

function Footer() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [footerData, setFooterData] = useState([]);
  useEffect(() => {
    axios
      .get(`${apiUrl}/footer/`)
      .then((response) => response.data)
      .then((data) => setFooterData(data.filter((element) => element.visible === 1)));
  }, []);

  return (
    <div>
      {!footerData.length ? (
        <p>Loading</p>
      ) : (
        <div className={styles.footerBackground}>
          <div className={styles.footerLigne}></div>
          <Navbar expand="lg" className={styles.footerContainer}>
            <div className={styles.footerLogo}>
              <Navbar.Brand href="/">
                <Image src={logo} alt="image logo" />
              </Navbar.Brand>
            </div>
            <div className={styles.footerMenu}>
              <ul className={styles.itemsNavBar}>
                {footerData
                  .filter((element) => element.section === 'list1')
                  .map((element) => {
                    if (element.category === 'titre') {
                      return <h3 className={styles.footerH3}>{element.text}</h3>;
                    } else {
                      return (
                        <div>
                          <Container>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                              <Nav>
                                <div key={element.position}>
                                  <Nav.Link href={element.pages.url} className={styles.footerLink}>
                                    {element.text}
                                  </Nav.Link>
                                </div>
                              </Nav>
                            </Navbar.Collapse>
                          </Container>
                        </div>
                      );
                    }
                  })}
              </ul>
              <ul className={styles.itemsNavBar}>
                {footerData
                  .filter((element) => element.section === 'list2')
                  .map((element) => {
                    if (element.category === 'titre') {
                      return <h3 className={styles.footerH3}>{element.text}</h3>;
                    } else {
                      return (
                        <div>
                          <Container>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                              <Nav className="me-auto">
                                <div key={element.position}>
                                  <Nav.Link href={element.pages.url} className={styles.footerLink}>
                                    {element.text}
                                  </Nav.Link>
                                </div>
                              </Nav>
                            </Navbar.Collapse>
                          </Container>
                        </div>
                      );
                    }
                  })}
              </ul>
            </div>
          </Navbar>
        </div>
      )}
    </div>
  );
}

export default Footer;
