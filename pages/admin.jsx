import React, { useState, useContext, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';

import OffCanvas from '../components/backoffice/OffCanvas';
import UserDisplay from '../components/backoffice/UserDisplay';
import LoginContext from '../contexts/loginContext';
import AdminLogin from '../components/backoffice/AdminLogIn';
import NavbarDisplay from '../components/backoffice/NavbarDisplay';
import MessagesDisplay from '../components/backoffice/MessagesDisplay';
import CategDisplay from '../components/backoffice/CategDisplay';

import styles from '../styles/admin.module.css';

function BackOffice() {
  const [showSidebar, setShowSidebar] = useState(false);
  const { isAdminLogin, checkIsAdminLogin } = useContext(LoginContext);
  const [category, setCategory] = useState('default');

  const handleShow = () => setShowSidebar(true);
  function handleChoice(category) {
    setCategory(category);
  }

  const categoryDisplay = () => {
    if (category === 'users') return <UserDisplay />;
    else if (category === 'messages') return <MessagesDisplay />;
    else if (category === 'navbar') return <NavbarDisplay />;
    else if (category === 'categories_devis') return <CategDisplay />;
    else
      return (
        <Card className={styles.adminCard}>
          <p>Depuis le bouton à gauche, vous avez accès aux différentes catégories d&apos;administration et personnalisation de votre site.</p>
          <p>
            Vous avew accès aux messages reçus, les demandes de devis, et également personnaliser les pages du site et les formulaires de demande de
            devis{' '}
          </p>
        </Card>
      );
  };

  useEffect(() => {
    checkIsAdminLogin();
  }, []);

  return (
    <div className={styles.adminContainer}>
      {!isAdminLogin ? (
        <AdminLogin />
      ) : (
        <>
          <OffCanvas handleChoice={handleChoice} setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
          <h1 className={styles.h1admin}>Devis67 Administration</h1>
          <div className={styles.containerSidePanel}>
            <Button className={styles.sidePanelBtn} variant="primary" onClick={() => handleShow()}>
              Menu
            </Button>
          </div>
          <section className={styles.sectionCategorySectionDisplay}>{categoryDisplay()}</section>
        </>
      )}
    </div>
  );
}

export default BackOffice;
