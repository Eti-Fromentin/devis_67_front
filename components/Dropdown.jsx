import React from 'react';
import { Dropdown } from 'react-bootstrap';
import styles from '../styles/DropDown.module.css';

const DropDown = () => {
  return (
    <>
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
    </>
  );
};

export default DropDown;
