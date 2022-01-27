import React from 'react';
import Form from 'react-bootstrap/Form';
import styles from '../styles/Radio.module.css';
// import FormCheck from 'react-bootstrap/FormCheck';

const Radio = () => {
  return (
    <>
      <Form className={styles.formRadio}>
        {['Radio'].map((type) => (
          <div key={type.id} className={styles.mb3Radio}>
            <Form.Check type={type} id={`default-${type}`} label={`Get data filtered here`} />
          </div>
        ))}
      </Form>
    </>
  );
};

export default Radio;
