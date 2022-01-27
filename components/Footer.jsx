import React from 'react';
import logo from '../public/logo.png';
import Image from 'next/image';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from '../styles/Footer.module.css';

import { Navbar, Container, Nav, Spinner } from 'react-bootstrap';

function Footer() {
  const [footerData, setFooterData] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:8000/api/footer/')
      .then((response) => response.data)
      .then((data) => setFooterData(data.filter((element) => element.visible === 1)));
  }, []);

  return (
    <>
      <div>
        {!footerData.length ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <div className={styles.footerBackground}>
            {/* COMPONENT NAVBAR PRINCIPAL WRAPPER */}
            <Navbar className={styles.footerContainer}>
              <Container className={styles.logoContainer}>
                <Navbar.Brand href="/" className={styles.navBarBrandFooter}>
                  <Image src={logo} alt="image logo" />
                </Navbar.Brand>
              </Container>

              {/* CONTAINER UL  COLOR/CHARTREUSE*/}
              <nav className={styles.navContainerUlFooter}>
                <ul className={styles.itemsNavBar1}>
                  {footerData
                    .filter((element) => element.section === 'list1')
                    .map((element) => {
                      if (element.category === 'titre') {
                        return <h3 className={styles.h3footer}>{element.text}</h3>;
                      } else {
                        return (
                          <div>
                            <Container>
                              <Navbar.Toggle aria-controls="basic-navbar-nav" />
                              <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className={styles.meAuto}>
                                  <div key={element.position}>
                                    <Nav.Link href={element.pages.url} className={styles.linksHoverFooter}>
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
                <ul className={styles.itemsNavBar2}>
                  {footerData
                    .filter((element) => element.section === 'list2')
                    .map((element) => {
                      if (element.category === 'titre') {
                        return <h3 className={styles.h3footer}>{element.text}</h3>;
                      } else {
                        return (
                          <div>
                            <Container>
                              <Navbar.Toggle aria-controls="basic-navbar-nav" />
                              <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className={styles.meAuto}>
                                  <div key={element.position}>
                                    <Nav.Link href={element.pages.url} className={styles.linksHoverFooter}>
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
              </nav>
              {/* END CONTAINER UL COLOR/CHARTREUSE */}
            </Navbar>
            {/*  END COMPONENT NAVBAR PRINCIPAL WRAPPER */}
          </div>
        )}
      </div>
    </>
  );
}

export default Footer;
