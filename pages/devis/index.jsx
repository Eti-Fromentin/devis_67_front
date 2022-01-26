import React from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
// import Suivant from '../../components/Suivant';
import styles from '../../styles/DevisHome.module.css';
import Data from '../../dataCategory.json';
import pic from '../../Assets/maison.jpg';
import Radio from '../../components/Radio';
// import axios from 'axios';
// import { Dropdown } from 'react-bootstrap';

const DevisHome = () => {
  return (
    <>
      <NavBar pageType="devis" />
      <section className={styles.bodyDevisHome}>
        {/* PRINCIPAL CONTAINER */}
        <section className={styles.containerDevisHome}>
          {/* LEFT CONTAINER */}
          <aside className={styles.leftContainerDevisHome}>
            {/* GRID 3 columns */}
            <div className={styles.leftTextDevisHome}>
              {Data.filter((element) => element.position === 5 && element.id === 16).map((element) => {
                // if (element.position === 5) {
                return <span key={element.position}>{element.text}</span>;
                // }
              })}
            </div>
            <div className={styles.leftSearchBarDevisHome}>
              {/* search bar */}
              <div className={styles.searchBoxDevisHome}>
                <input className={styles.searchInputDevisHome} type="text" placeholder="Tapez votre recherche..."></input>
                <button className={styles.searchBtnDevisHome}>
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
            {/* options */}
            <div className={styles.leftOptionsDevisHome}>
              {Data.map((element) => {
                return <span key={element.id}>{element.text}</span>;
              })}
            </div>
          </aside>
          {/* RIGHT CONTAINER */}
          <aside className={styles.rightContainerDevisHome}>
            <aside className={styles.hightBlockDevisHome}>
              <div className={styles.titlehightBlockDevisHome}>
                <span>BESOIN DE FAIRE APPEL À UN ARTISAN ?</span>
                <span>DEVIS67 EST LA SOLUTION !</span>
              </div>
              <div className={styles.infohightBlockDevisHome}>
                <span>COMMENT EST-CE QUE ÇA FONCTIONNE ?</span>
                <div className={styles.displayDevisHome}>
                  <img src={pic} width={40} height={40} alt="pic" />
                  Faites votre demande de devis.
                </div>
                <div className={styles.displayDevisHome}>
                  <img src={pic} width={40} height={40} alt="pic" />
                  Recevez gratuitement des devis sur mesure.
                </div>
                <div className={styles.displayDevisHome}>
                  <img src={pic} width={40} height={40} alt="pic" />
                  Comparez et sélectionnez lartisan de votre choix.
                </div>
              </div>
            </aside>
            <aside className={styles.lowBlockDevisHome}>{/* IMAGE URL BACKGROUND */}</aside>
          </aside>
        </section>
      </section>
      <Radio />
      <Footer />
    </>
  );
};
export default DevisHome;
{
  /* <section className={styles.bodyDevisAllQuestions}> */
}
{
  /* CONTAINER */
}
{
  /* <section className={styles.containerDevisAllQuestions}>
          {' '} */
}
{
  /* TITLE CONTAINER -- FIRST ROW*/
}
{
  /* <div className={styles.titleContainerDevisAllQuestions}>
            <h1>Devis Fenêtres (PVC, Bois, Alu)</h1>
          </div> */
}
{
  /* "Quelle est la nature de vos projets ?  -- SECOND ROW*/
}
{
  /* <div className={styles.firstRowDevisAllQuestions}>
            <span>Quelle est la nature de vos projets ?</span>
            <section className={styles.containerCheckboxInput}>
              <div className={styles.btnFirstRow}>
                <input type="checkbox" />
                <label htmlFor="neuf">Neuf</label>
              </div>
              <div className={styles.btnFirstRow}> */
}
{
  /* <input type="checkbox" />
                <label htmlFor="Rénovation">Rénovation</label>
              </div>
              <div className={styles.btnFirstRow}>
                <input type="checkbox" />
                <label htmlFor="Remplacement">Remplacement</label>
              </div>
            </section>
          </div> */
}
{
  /* "Quel est l'objectif de votre démarche ?" --- THIRD ROW */
}
{
  /* <div className={styles.secondRowDevisAllQuestions}>
            <span>Quelle est l&rsquoobjectif de votre démarche ?</span>
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
              </div> */
}
{
  /* </section> */
}
{
  /* </div> */
}
{
  /* FOURTH-ROW === "Quand voudriez-vous travailler ?" */
}
{
  /* // <section className={styles.thirdRowDevisAllQuestions}>
          //   <span>Quand voudriez-vous débuter les travaux ?</span>
          //   <Dropdown className={styles.btnDropDownDevisAllQuestions}>
          //     <Dropdown.Toggle variant="success" id="dropdown-basic">
          //       SELECTIONNEZ
          //     </Dropdown.Toggle>
          //     <Dropdown.Menu>
          //       <Dropdown.Item href="#/action-1">1</Dropdown.Item>
          //       <Dropdown.Item href="#/action-2">2</Dropdown.Item>
          //       <Dropdown.Item href="#/action-3">3</Dropdown.Item>
          //       <Dropdown.Item href="#/action-4">4</Dropdown.Item>
          //       <Dropdown.Item href="#/action-5">5</Dropdown.Item>
          //       <Dropdown.Item href="#/action-Plus">Plus</Dropdown.Item>
          //     </Dropdown.Menu> */
}
{
  /* //   </Dropdown> */
}
{
  /* // </section> */
}
{
  /* FIFTH ROW === low button */
}
{
  /* <section className={styles.containerSubmitDevisAllQuestions}>
            <Suivant />
          </section>
        </section>
      </section> */
}
{
  /* <Footer />
    </> */
}
//   );
// }
// export default AccueilDevis;
