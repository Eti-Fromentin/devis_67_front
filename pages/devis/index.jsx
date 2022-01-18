import React from 'react';
// import DevisAllQuestions from '../../components/DevisAllQuestions';
// import DevisHome from '../../components/DevisHome';
import NavBar from '../../components/NavBar';
import AnnPageCommune from '../../components/AnnPageCommune';
import Footer from '../../components/Footer';

function AccueilDevis() {
  return (
    <>
      <NavBar pageType="devis" />
      {/* <DevisHome /> */}
      {/* <DevisAllQuestions /> */}
      <AnnPageCommune />
      <Footer />
    </>
  );
}

export default AccueilDevis;
