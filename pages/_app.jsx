import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Inscription from '../components/Inscription';
import Connexion from '../components/Connexion';
import HomePage from './HomePage';
import InscriptionBis from '../components/InscriptionBis';


function MyApp() {
  return (
    <>
    <Connexion />
    <InscriptionBis />
    </>
  );
}

export default MyApp;
