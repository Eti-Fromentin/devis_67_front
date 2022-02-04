import React, { useState, useContext, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import OffCanvas from '../components/backoffice/OffCanvas';
import UserDisplay from '../components/backoffice/UserDisplay';
import LoginContext from '../contexts/loginContext';

import styles from '../styles/admin.module.css';
import AdminLogin from '../components/backoffice/AdminLogIn';
import NavbarDisplay from '../components/backoffice/NavbarDisplay';

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
    else if (category === 'navbar') return <NavbarDisplay />;
    else return 'hello ';
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
          <h1 className={styles.h1admin}>Devis67 Back Office</h1>
          <div className={styles.containerSidePanel}>
            <Button className={styles.sidePanelBtn} variant="primary" onClick={() => handleShow()}>
              Side Panel
            </Button>
          </div>
          <section className={styles.sectionCategorySectionDisplay}>{categoryDisplay()}</section>
        </>
      )}
    </div>
  );
}

export default BackOffice;