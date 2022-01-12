import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ConnexionBis from '../components/ConnexionBis';
import HomePage from './HomePage';
import InscriptionBis from '../components/InscriptionBis';


function MyApp() {
  return (
    <>
    <HomePage />
    <ConnexionBis />
    <InscriptionBis />
    </>
  );
}

export default MyApp;
