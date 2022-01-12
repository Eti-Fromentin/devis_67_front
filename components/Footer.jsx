import React from 'react';
import logo from '../public/logo.png';
import Image from 'next/image';
import axios from 'axios';
import { useEffect, useState } from 'react';
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
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="/">
              <Image src={logo} alt="image logo" />
            </Navbar.Brand>
          </Container>
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {footerData.length &&
                  footerData.map((element) => {
                    if (element.category === 'titre') {
                      return <h3 key={element.id}>{element.text}</h3>;
                    } else {
                      return (
                        <div key={element.id}>
                          <Nav.Link href={element.pages.url}>{element.text}</Nav.Link>
                        </div>
                      );
                    }
                  })}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </div>
  );
}
export default Footer;
