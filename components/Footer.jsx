import React from 'react';
//import logo from '../public/logo.png';
//import Image from 'next/image';
import axios from 'axios';
import { useEffect, useState } from 'react';
//import { Navbar, Container, Nav } from 'react-bootstrap';

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
        <div>
          <ul>
            {footerData
              .filter((element) => element.section === 'list1')
              .map((element) => {
                if (element.category === 'titre') {
                  return <h4>{element.text}</h4>;
                } else {
                  return <li> {element.text}</li>;
                }
              })}
          </ul>
          <ul>
            {footerData
              .filter((element) => element.section === 'list2')
              .map((element) => {
                if (element.category === 'titre') {
                  return <h4>{element.text}</h4>;
                } else {
                  return <li> {element.text}</li>;
                }
              })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Footer;
