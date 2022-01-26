import React from 'react';
import styles from '../../styles/DevisAllQuestions.module.css';
import { Dropdown } from 'react-bootstrap';
import axios from 'axios';
import Radio from '../../components/Radio';

function DevisAllQuestions({ posts }) {
  return (
    <section className={styles.bodyDevisAllQuestions}>
      {/* CONTAINER */}
      <section className={styles.containerDevisAllQuestions}>
        {/* TITLE CONTAINER -- FIRST ROW*/}
        <div className={styles.titleContainerDevisAllQuestions}>
          <h1>Devis Fenêtres (PVC, Bois, Alu)</h1>
        </div>
        {/* "Quelle est la nature de vos projets ?  -- SECOND ROW*/}
        <div className={styles.firstRowDevisAllQuestions}>
          {posts.map((textMap) => {
            return (
                <span key={textMap.id}>{textMap.question}</span>
            );
          })}
          <section className={styles.containerCheckboxInput}>
            {posts.map((mapData) => {
              return (
                <div className={styles.btnFirstRow}>
                  <Radio key={mapData.id} label={mapData.answer} />
                </div>
              );
            })}
            {/* <div className={styles.btnFirstRow}>
              <input type="checkbox" />
              <label htmlFor="Rénovation">Rénovation</label>
            </div>
            <div className={styles.btnFirstRow}>
              <input type="checkbox" />
              <label htmlFor="Remplacement">Remplacement</label>
            </div> */}
          </section>
        </div>

        {/* "Quel est l'objectif de votre démarche ?" --- THIRD ROW */}
        <div className={styles.secondRowDevisAllQuestions}>
          <span>Quelle est lobjectif de votre démarche ?</span>
          <section className={styles.containerCheckboxInput}>
            <div className={styles.btnSecondRow}>
              <input type="checkbox" />
              <label htmlFor="Obtenir un devis rapidement">Obtenir un devis rapidement</label>
            </div>
            <div className={styles.btnSecondRow}>
              <input type="checkbox" />
              <label htmlFor="Trouver une entreprise disponible">Trouver une entreprise disponible</label>
            </div>
            <div className={styles.btnSecondRow}>
              <input type="checkbox" />
              <label htmlFor="Voir les prix">Voir les prix</label>
            </div>
          </section>
        </div>

        {/* FOURTH-ROW === "Quand voudriez-vous travailler ?" */}
        <section className={styles.thirdRowDevisAllQuestions}>
          <span>Quand voudriez-vous débuter les travaux ?</span>
          <Dropdown className={styles.btnDropDownDevisAllQuestions}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              SELECTIONNEZ
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">1</Dropdown.Item>
              <Dropdown.Item href="#/action-2">2</Dropdown.Item>
              <Dropdown.Item href="#/action-3">3</Dropdown.Item>
              <Dropdown.Item href="#/action-4">4</Dropdown.Item>
              <Dropdown.Item href="#/action-5">5</Dropdown.Item>
              <Dropdown.Item href="#/action-Plus">Plus</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </section>

        {/* FIFTH ROW === low button */}
        <section className={styles.containerSubmitDevisAllQuestions}>
          <button>SUIVANT</button>
        </section>
      </section>
    </section>
  );
}

export async function getStaticProps() {
  const posts = await axios
    .get('http://localhost:8000/api/from/Fénêtres')
    .then((response) => response.data)
    .then((data) => {
      console.log(data);
    });

  return {
    props: {
      posts,
    },
  };
}

export default DevisAllQuestions;
