import React from 'react';
//import logo from '../images/logo.png';
//import Image from 'next/image';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
//import Link from 'next/link';

function NavBar() {
  const [navBarData, setNavBarData] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:8000/api/navbar/')
      .then((response) => response.data)
      .then((data) => setNavBarData(data.filter((element) => element.visible === 1)));
  }, []);

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">{/* <Image src={logo} alt="image logo" /> */}</Navbar.Brand>
        </Container>
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {navBarData.length &&
                navBarData.map((element, index) => {
                  /* <Link key={index}>
                    <a href={{ pathname: '/' }}> {element.text} </a>
                  </Link>;*/
                  <Nav.Link key={index} href={element.url}>
                    {element.text}
                  </Nav.Link>;
                })}

              {/* <Nav.Link href="#home">{navBarData.length && navBarData[2].text}</Nav.Link>
              <Nav.Link href="DevisAides">Devis</Nav.Link>
              <Nav.Link href="DevisAides">Aides</Nav.Link>
              <Nav.Link href="EspaceClient">Mon espace personnel</Nav.Link>
              <Nav.Link href="Aide">Besoin d aide</Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
export default NavBar;
