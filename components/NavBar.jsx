import React from 'react';
//import logo from '../images/logo.png';
//import Image from 'next/image';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

function NavBar({ pageType }) {
  const [navBarData, setNavBarData] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:8000/api/navbar/')
      .then((response) => response.data)
      .then((data) => setNavBarData(data.filter((element) => element.visible === 1 && element.pagetype === pageType)));
  }, []);

  return (
    <div>
      {!navBarData.length ? (
        <p>Loading</p>
      ) : (
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="/">{/* <Image src={logo} alt="image logo" /> */}</Navbar.Brand>
          </Container>
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {navBarData.length &&
                  navBarData.map((element) => {
                    return (
                      <div key={element.position}>
                        <Nav.Link href={element.pages.url}>{element.text}</Nav.Link>
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
