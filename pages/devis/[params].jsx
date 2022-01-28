import React from 'react';
import styles from '../../styles/DevisAllQuestions.module.css';
import { Card, Dropdown, Spinner, Form, FormCheck } from 'react-bootstrap';
import axios from 'axios';
// import Radio from '../../components/Radio';
import Head from 'next/head';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

function DevisAllQuestions({ form, headInfo }) {
  const radioChoice = (elt) => {
    const answer = elt.formulaire_join_answer;
    return (
      <section className={styles.containerRadioChoiceComponent}>
        <h1>{elt.question}</h1>
        <Form className={styles.formTagRadioChoice}>
          {answer &&
            answer.map((elt) => (
              <Card className={styles.inputCardRadioChoice} key={elt.id}>
                <FormCheck
                  key={elt.id}
                  className={styles.inputRadio}
                  type="radio"
                  label={elt.formulaire_possible_answer.answer}
                  name={elt.formulaire_id}
                />
              </Card>
            ))}
        </Form>
      </section>
    );
  };

  const checkChoice = (elt) => {
    const answer = elt.formulaire_join_answer;
    return (
      <section className={styles.containerCheckChoiceComponent}>
        <h1>{elt.question}</h1>
        <Form className={styles.formTagCheckChoice}>
          {answer &&
            answer.map((elt) => (
              <Card className={styles.inputCardCheckChoice} key={elt.id}>
                <FormCheck key={elt.id} type="checkbox" label={elt.formulaire_possible_answer.answer} name={elt.formulaire_id} />
              </Card>
            ))}
        </Form>
      </section>
    );
  };

  const listChoice = (elt) => {
    const answer = elt.formulaire_join_answer;
    return (
      <section className={styles.containerListChoiceComponent}>
        <h1>{elt.question}</h1>

        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic" className={styles.btnDropDownToggleDevisAllQuestions}>
            SELECTIONNEZ
          </Dropdown.Toggle>

          <Dropdown.Menu className={styles.btnDropDownMenuDevisAllQuestions}>
            {answer.map((elt) => (
              <h2 key={elt.id}>
                <Dropdown.Item className={styles.btnDropDownItemDevisAllQuestions} href="#/action-1">
                  {elt.formulaire_possible_answer.answer}
                </Dropdown.Item>
              </h2>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </section>
    );
  };

  const shortText = (elt) => {
    return (
      <section className={styles.containerShortTextComponent}>
        <h1>{elt.question}</h1>
        <Form.Text>
          <Form.Control className={styles.formControlShortText} type="text" id={elt.question} />
          <Form.Text>Entrez votre réponse</Form.Text>
        </Form.Text>
      </section>
    );
  };

  const longText = (elt) => {
    return (
      <section className={styles.containerLongTextComponent}>
        <h1>{elt.question}</h1>
        <div className={styles.containerFormLongTextComponent}>
          <Form.Control type="text" id={elt.question} className={styles.inputFormLongTextComponent} />
          <Form.Text>Entrez votre réponse</Form.Text>
        </div>
      </section>
    );
  };

  const DevisForm = (elt) => {
    if (elt.type_question === 'radioChoice') return radioChoice(elt);
    else if (elt.type_question === 'checkChoice') return checkChoice(elt);
    else if (elt.type_question === 'list') return listChoice(elt);
    else if (elt.type_question === 'shortText') return shortText(elt);
    else if (elt.type_question === 'longText') return longText(elt);
    else return <h2>{elt.question}</h2>;
  };

  const head = headInfo && headInfo[0];
  return (
    <div>
      <NavBar pageType="devis" />
      {!form ? (
        <div className={styles.spinnerContainer}>
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <Head>
            <title>{head.title}</title>
            <meta name="description" content={head.description} />
            <meta name="keywords" content={head.keywords} />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          </Head>
          <Card className={styles.bodyDevisAllQuestions}>
            <Form className={styles.containerDevisAllQuestions}>
              {form.map((elt, index) => (
                <div key={index}>{DevisForm(elt)}</div>
              ))}
            </Form>
          </Card>
        </>
      )}
      <Footer pageType="devis" />
    </div>
  );
}

export async function getStaticProps(context) {
  const params = context.params.params;

  const form = await axios
    .get(`http://localhost:8000/api/form/${params}`)
    .then((response) => response.data)
    .then((data) => data.filter((elt) => elt.visible === 1));
  const headInfo = await axios.get(`http://localhost:8000/api/pagesdetails/${params}`).then((response) => response.data);
  return {
    props: {
      form,
      headInfo,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      // { params: { ... } } // See the "paths" section below
    ],
    fallback: true,
  };
}

export default DevisAllQuestions;
