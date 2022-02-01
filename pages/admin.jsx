import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import OffCanvas from '../components/backoffice/OffCanvas';
import UserDisplay from '../components/backoffice/UserDisplay';

import styles from '../styles/admin.module.css';

function BackOffice() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [category, setCategory] = useState('default');

  const handleShow = () => setShowSidebar(true);
  function handleChoice(category) {
    setCategory(category);
  }

  return (
    <div className={styles.adminContainer}>
      <OffCanvas handleChoice={handleChoice} setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
      <h1>Devis67 Back Office</h1>
      <Button className={styles.sidePanelBtn} variant="primary" onClick={handleShow}>
        Side Panel
      </Button>
      <section>
        <Card className={styles.adminCard}>
          <UserDisplay />
        </Card>
      </section>
    </div>
  );
}

export default BackOffice;
