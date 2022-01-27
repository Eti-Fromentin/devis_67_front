import React from 'react';
import styles from '../styles/Checkbox.module.css';
import Form from 'react-bootstrap/Form';

const Checkbox = () => {
  return (
    <>
      <Form className={styles.formCheckbox}>
        {['checkbox'].map((type) => (
          <div key={type.id} className={styles.mb3Checkbox}>
            <Form.Check type={type} id={`default-${type}`} label={`Get data filtered here`} />
          </div>
        ))}
      </Form>
    </>
  );
};

export default Checkbox;
