import React from 'react';

import axios from 'axios';

import { Container } from 'react-bootstrap';

function ModeEmploi({ posts }) {
  return (
    <div>
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
