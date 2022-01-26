import React from 'react';
import Form from 'react-bootstrap/Form';
import styles from '../styles/Radio.module.css';
// import FormCheck from 'react-bootstrap/FormCheck';

const Radio = () => {
  return (
    <>
      <Form className={styles.formRadio}>
        {['checkbox'].map((type) => (
          <div key={type.id} className={styles.mb3}>
            {/* <Form.Check type={type} id={`default-${type}`} label={} /> */}
          </div>
        ))}
      </Form>
    </>
  );
};

export default Radio;
