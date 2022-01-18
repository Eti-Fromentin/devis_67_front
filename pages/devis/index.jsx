import React from 'react';
import DevisAllQuestions from '../../components/DevisAllQuestions';
// import DevisHome from '../../components/DevisHome';
import NavBar from '../../components/NavBar';

function AccueilDevis() {
  return (
    <>
      <NavBar pageType="devis" />
      {/* <DevisHome /> */}
      <DevisAllQuestions />
    </>
  );
}

export default AccueilDevis;
