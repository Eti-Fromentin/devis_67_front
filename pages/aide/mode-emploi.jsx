import React from 'react';
import NavBar from '../../components/NavBar';
import SCAP1 from '../../components/SCAP1';


import axios from 'axios';

import { Container } from 'react-bootstrap';

function ModeEmploi({ posts }) {
  return (
    <div>
<<<<<<< HEAD
      <NavBar pageType="devis" />
      <SCAP1 />
=======
      <h1>Mode d emploi</h1>
      {!posts ? (
        <p>Loading</p>
      ) : (
        <div>
          <ul>
            {posts
              .filter((itemsMenu) => itemsMenu.page_section === 'chapterTitle')
              .map((itemMenu) => (
                <li key={itemMenu.key}>{itemMenu.text}</li>
              ))}
          </ul>
          <Container>
            {posts.map((itemMenu) => {
              if (itemMenu.page_section === 'chapterTitle') {
                return <h5 key={itemMenu.key}>{itemMenu.text}</h5>;
              } else if (itemMenu.page_section === 'text') {
                return <p>{itemMenu.text}</p>;
              }
            })}
          </Container>
        </div>
      )}
>>>>>>> bde99e2b592f947b5034d96509565e8c49ad44d9
    </div>
  );
}
export async function getStaticProps() {
  const posts = await axios
    .get('http://localhost:8000/api/pagescontent')
    .then((response) => response.data)
    .then((data) => data.filter((element) => element.visible === 1));

  return {
    props: {
      posts,
    },
  };
}

export default ModeEmploi;
