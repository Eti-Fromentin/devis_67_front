//deux onglets Aides et Devis
import React from 'react';

import Devis from '../components/Devis';
import Aides from '../components/Aides';

import 'uikit/dist/css/uikit.min.css';

export default function DevisAides() {
  return (
    <div className="uk-flex uk-flex-center">
      <Devis />
      <Aides />
    </div>
  );
}
