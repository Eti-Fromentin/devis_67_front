import React from 'react';
import logo from '../public/logo.png';
import Image from 'next/image';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

function Footer() {
  const [footerData, setFooterData] = useState([]);
  useEffect(async () => {
    await axios
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
            <Navbar.Toggle aria-controls="basic-navbar-nav">
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                {footerData
                    .filter((element) => element.position === 1)
                    .map((element, index) => (
                      <Nav.Link key={index}> {element.text}</Nav.Link>
                    ))}
                </Nav>
              </Navbar.Collapse>
            </Navbar.Toggle>
          </Container>
        </Navbar>
      )}
    </div>
  );
}
export default Footer;
