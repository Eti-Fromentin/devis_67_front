import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import LoginContext from '../../contexts/loginContext';

import Head from 'next/head';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';

import { Card, Dropdown, Spinner, Form, FormCheck, Button, DropdownButton, ButtonGroup, Modal, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from 'react-hook-form';

import styles from '../../styles/DevisAllQuestions.module.css';

function DevisAllQuestions({ form, headInfo }) {
  const { isLogin, checkIsLogin, getUserData, userId, userToken } = useContext(LoginContext);
  const [completedForm, setCompletedForm] = useState([]);
  const head = headInfo && headInfo[0];
  const { handleSubmit } = useForm({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    checkIsLogin();
    if (isLogin) {
      getUserData();
    }
  }, [isLogin, form]);

  const categoryId = () => {
    const category = form && form[form.length - 1].category_id;
    return Number(category);
  };

  const configAxios = {
    method: 'post',
    url: `${apiUrl}/devis/${userId}`,
    headers: {
      Authorization: `Bearer ${userToken}`,
      'Content-Type': 'application/json',
    },
    data: {
      default: {
        user_id: Number(userId),
        category_id: categoryId(),
      },
      questionsAnswers: completedForm,
    },
  };

  const formSubmit = () => {
    axios(configAxios);
  };

  const radioChoice = (elt) => {
    const answer = elt.formulaire_join_answer;
    const question = elt.question;
    return (
      <section className={styles.containerRadioChoiceComponent}>
        <h2>{elt.question}</h2>
        <ButtonGroup className={styles.formTagRadioChoice} type="radio" onChange={(e) => handleChange(e.target.value, question)}>
          {answer &&
            answer.map((elt) => (
              <Card className={styles.inputCardRadioChoice} key={elt.id}>
                <FormCheck
                  inline
                  key={elt.id}
                  className={styles.inputRadio}
                  type="radio"
                  label={elt.formulaire_possible_answer.answer}
                  value={elt.formulaire_possible_answer.answer}
                  name={elt.formulaire_id}
                />
              </Card>
            ))}
        </ButtonGroup>
      </section>
    );
  };

  const checkChoice = (elt) => {
    const answer = elt.formulaire_join_answer;
    const question = elt.question;
    return (
      <section className={styles.containerCheckChoiceComponent}>
        <h2>{question}</h2>
        <ButtonGroup type="checkbox" onChange={(e) => handleCheckChange(e.target.value, question)} className={styles.formTagCheckChoice}>
          {answer &&
            answer.map((elt) => (
              <Card className={styles.inputCardCheckChoice} key={elt.id}>
                <FormCheck
                  inline
                  key={elt.id}
                  label={elt.formulaire_possible_answer.answer}
                  name={elt.formulaire_id}
                  value={elt.formulaire_possible_answer.answer}
                />
              </Card>
            ))}
        </ButtonGroup>
      </section>
    );
  };

  const listChoice = (elt) => {
    const choice = elt.formulaire_join_answer;
    return (
      <section className={styles.containerListChoiceComponent}>
        <h2>{elt.question}</h2>
        <Form className={styles.btnDropDownDevisAllQuestions}>
          <DropdownButton
            className={styles.btnDropDownToggleDevisAllQuestions}
            onSelect={(event) => handleChange(event, elt.question)}
            title="Selectionnez votre réponse"
          >
            {choice.map((elt) => (
              <div className={styles.divKeyListChoice} key={elt.id}>
                <Dropdown.Item className={styles.btnDropDownItemDevisAllQuestions} eventKey={elt.formulaire_possible_answer.answer}>
                  {elt.formulaire_possible_answer.answer}
                </Dropdown.Item>
              </div>
            ))}
          </DropdownButton>
        </Form>
      </section>
    );
  };

  const shortText = (elt) => {
    return (
      <section className={styles.containerShortTextComponent}>
        <h2>{elt.question}</h2>
        <Form.Group className="mb-3">
          <Form.Text>
            <Form.Control
              className={styles.formControlShortText}
              onChange={(event) => handleChange(event.target.value, elt.question)}
              size="sm"
              type="textarea"
              placeholder={elt.question}
              id={elt.question}
            />
            <Form.Text>Entrez votre réponse</Form.Text>
          </Form.Text>
        </Form.Group>
      </section>
    );
  };

  const longText = (elt) => {
    return (
      <section className={styles.containerLongTextComponent}>
        <h2>{elt.question}</h2>
        <Form.Group className={styles.containerFormLongTextComponent}>
          <Form.Text>
            <Form.Control
              onChange={(event) => handleChange(event.target.value, elt.question)}
              type="textarea"
              placeholder={elt.question}
              id={elt.question}
            />
            <Form.Text>Entrez votre réponse</Form.Text>
          </Form.Text>
        </Form.Group>
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

  const handleCheckChange = (event, question) => {
    let tempArray = completedForm;
    if (!completedForm.length) {
      setCompletedForm([{ questions: question, answers: event }]);
    } else if (completedForm.some((elt) => elt.questions === question && elt.answers.includes(event))) {
      let index = completedForm.findIndex((elt) => elt.answers.includes(event) && elt.questions === question);
      tempArray[index].answers = completedForm[index].answers.replaceAll(event, '');
      setCompletedForm(tempArray);
    } else if (completedForm.some((elt) => elt.questions === question)) {
      let index = completedForm.findIndex((elt) => elt.questions === question);
      tempArray[index].answers = completedForm[index].answers.concat(', ', event);
      setCompletedForm(tempArray);
    } else {
      setCompletedForm([...completedForm, { questions: question, answers: event }]);
    }
  };

  const handleChange = async (event, question) => {
    if (!completedForm.length) {
      setCompletedForm([{ questions: question, answers: event }]);
    } else if (completedForm.some((elt) => elt.questions === question)) {
      let index = completedForm.findIndex((elt) => elt.questions === question);
      let tempArray = completedForm;
      tempArray[index] = { questions: question, answers: event };
      setCompletedForm(tempArray);
    } else {
      setCompletedForm([...completedForm, { questions: question, answers: event }]);
    }
  };

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
          <h1 className={styles.topTitleDevisForm}>Remplissez ce formulaire et nous vous enverrons les devis dans les plus brefs délais :</h1>
          {!isLogin && (
            <Alert variant="danger">
              Vous ne pouvez pas faire de demande de devis sans être connecté. <Alert.Link href="/espace-client">Inscrivez vous içi!</Alert.Link>
            </Alert>
          )}
          <Card className={styles.bodyDevisAllQuestions}>
            <Form onSubmit={handleSubmit(formSubmit)} className={styles.containerDevisAllQuestions}>
              {form.map((elt, index) => (
                <div key={index}>{DevisForm(elt)}</div>
              ))}
              {!isLogin ? (
                <Button variant="primary" type="submit" disabled>
                  Valider
                </Button>
              ) : (
                <Button variant="primary" type="submit" onClick={handleShow}>
                  Valider
                </Button>
              )}
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Devis67</Modal.Title>
                </Modal.Header>
                <Modal.Body>Votre devis est envoyé!</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Fermer
                  </Button>
                </Modal.Footer>
              </Modal>
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
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  let form = null;
  try {
    form = await axios
      .get(`${apiUrl}/form/${params}`)
      .then((response) => response.data)
      .then((data) => data.filter((elt) => elt.visible === 1));
    const headInfo = await axios.get(`${apiUrl}/pagesdetails/${params}`).then((response) => response.data);
    return {
      props: {
        form,
        headInfo,
      },
    };
  } catch (error) {
    return 404;
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export default DevisAllQuestions;
