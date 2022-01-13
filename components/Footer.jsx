import React from 'react';
import logo from '../public/logo.png';
import Image from 'next/image';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from '../styles/Footer.module.css';

import { Navbar, Container, Nav } from 'react-bootstrap';

function Footer() {
  const [footerData, setFooterData] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:8000/api/footer/')
      .then((response) => response.data)
      .then((data) => setFooterData(data.filter((element) => element.visible === 1)));
  }, []);

  return (
    <div>
      {!footerData.length ? (
        <p>Loading</p>
      ) : (
        <div className={styles.footerBackground}>
          <Navbar expand="lg" className={styles.footerContainer}>
            <Container>
              <Navbar.Brand href="/">
                <Image src={logo} alt="image logo" />
              </Navbar.Brand>
            </Container>
            <ul className={styles.itemsNavBar}>
              {footerData
                .filter((element) => element.section === 'list1')
                .map((element) => {
                  if (element.category === 'titre') {
                    return <h3>{element.text}</h3>;
                  } else {
                    return (
                      <div>
                        <Container>
                          <Navbar.Toggle aria-controls="basic-navbar-nav" />
                          <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className={styles.meAuto}>
                              <div key={element.position}>
                                <Nav.Link href={element.pages.url}>{element.text}</Nav.Link>
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
                    return <h3>{element.text}</h3>;
                  } else {
                    return (
                      <div>
                        <Container>
                          <Navbar.Toggle aria-controls="basic-navbar-nav" />
                          <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                              <div key={element.position}>
                                <Nav.Link href={element.pages.url}>{element.text}</Nav.Link>
                              </div>
                            </Nav>
                          </Navbar.Collapse>
                        </Container>
                      </div>
                    );
                  }
                })}
            </ul>
          </Navbar>
        </div>
      )}
    </div>
  );
}

export default Footer;
