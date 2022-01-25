import React from 'react';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import Renseignement from '../components/Renseignement';

function Contact() {
  return (
    <div>
      <NavBar pageType="devis" />
      <Renseignement />
      <Footer pageType="devis" />
    </div>
  );
}

export default Contact;
