import React from 'react';
import NavBar from '../../components/NavBar';
// import DevisHome from '../components/DevisHome';


import axios from 'axios';
import styles from '../../styles/mode-emploi.module.css';

//import { Container } from 'react-bootstrap';

function ModeEmploi({ posts }) {
  return (
    <div>
      <h1>Mode d emploi</h1>
      {!posts ? (
        <p>Loading</p>
      ) : (
        <div className={styles.containerModeEmploi}>
          {posts.map((itemMenu) => {
            for (let i = 0; i < i.lenght; i++) {
              if (itemMenu.page_section === i) {
                return (
                  <div key={itemMenu.position}>
                    <p>{itemMenu.text}</p>
                  </div>
                );
              }
            }
          })}
        </div>
      )}
    </div>
  );
}
export async function getStaticProps() {
  const posts = await axios
    .get('http://localhost:8000/api/pagescontent')
    .then((response) => response.data)
    .then((data) => data.filter((element) => element.visible === 1 && element.page_name === 'modeEmploi'));

  return {
    props: {
      posts,
    },
  };
}

export default ModeEmploi;
