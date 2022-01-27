import React, { useEffect } from 'react';
import { Card, CardGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import styles from '../styles/Radio.module.css';
import FormCheck from 'react-bootstrap/FormCheck';

const Radio = ({ elt }) => {
  const answer = elt.formulaire_possible_answer.answer;

  useEffect(() => {
    console.log(elt.formulaire_id);
  }, []);

  return (
    <Form>
      <FormCheck type="radio" label={answer} name={elt.formulaire_id} />
    </Form>
  );
};

export default Radio;
