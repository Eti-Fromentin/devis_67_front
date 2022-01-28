import React, { useState, useEffect } from 'react';
import styles from '../../styles/DevisAllQuestions.module.css';
import { Card, Dropdown, Spinner, Form, FormCheck, Button, DropdownButton, ButtonGroup } from 'react-bootstrap';
import axios from 'axios';
import Head from 'next/head';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import { useForm } from 'react-hook-form';

function DevisAllQuestions({ form, headInfo }) {
  const [completedForm, setCompletedForm] = useState([]);
  const head = headInfo && headInfo[0];
  const { handleSubmit } = useForm({});

  useEffect(() => {
    console.log(completedForm);
  }, [completedForm]);

  const configAxios = {
    method: 'post',
    url: 'http://localhost:8000/api/devis/80',
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODAsImlhdCI6MTY0MzAyMzE5MX0.jQb4QHRbbjwFZSN0W8TI4U2kwQFq0l_DNTL4vzSSO10`,
      'Content-Type': 'application/json',
    },
    data: {
      default: {
        user_id: 80,
        category_id: 2,
      },
      questionsAnswers: completedForm,
    },
  };

  const formSubmit = () => {
    axios(configAxios);
    console.table(completedForm);
  };

  const radioChoice = (elt) => {
    const answer = elt.formulaire_join_answer;
    const question = elt.question;
    return (
      <div>
        <h2>{elt.question}</h2>
        <ButtonGroup type="radio" onChange={(e) => handleListChange(e.target.value, question)}>
          {answer &&
            answer.map((elt) => (
              <Card className={styles.inputCard} key={elt.id}>
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
      </div>
    );
  };

  const checkChoice = (elt) => {
    const answer = elt.formulaire_join_answer;
    const question = elt.question;
    return (
      <div>
        <h2>{question}</h2>
        <ButtonGroup type="checkbox" onChange={(e) => handleCheckChange(e.target.value, question)}>
          {answer &&
            answer.map((elt) => (
              <Card className={styles.inputCard} key={elt.id}>
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
      </div>
    );
  };

  const listChoice = (elt) => {
    const choice = elt.formulaire_join_answer;
    return (
      <div>
        <h2>{elt.question}</h2>
        <Form className={styles.btnDropDownDevisAllQuestions}>
          <DropdownButton onSelect={(event) => handleListChange(event, elt.question)} title="Selectionnez votre réponse">
            {choice.map((elt) => (
              <h2 key={elt.id}>
                <Dropdown.Item eventKey={elt.formulaire_possible_answer.answer}>{elt.formulaire_possible_answer.answer}</Dropdown.Item>
              </h2>
            ))}
          </DropdownButton>
        </Form>
      </div>
    );
  };

  const shortText = (elt) => {
    return (
      <div>
        <h2>{elt.question}</h2>
        <Form.Group className="mb-3">
          <Form.Text>
            <Form.Control size="sm" type="textarea" id={elt.question} />
            <Form.Text>Entrez votre réponse</Form.Text>
          </Form.Text>
        </Form.Group>
      </div>
    );
  };

  const longText = (elt) => {
    return (
      <div>
        <h2>{elt.question}</h2>
        <Form.Control type="textarea" id={elt.question} />
        <Form.Text>Entrez votre réponse</Form.Text>
      </div>
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
      console.log(tempArray);
      console.log(completedForm);
      let index = completedForm.findIndex((elt) => elt.answers.includes(event) && elt.questions === question);
      tempArray[index].answers = completedForm[index].answers.replaceAll(event, '');
      setCompletedForm(tempArray);
    } else if (completedForm.some((elt) => elt.questions === question)) {
      console.log(tempArray);
      console.log(completedForm);
      let index = completedForm.findIndex((elt) => elt.questions === question);
      tempArray[index].answers = completedForm[index].answers.concat(', ', event);
      setCompletedForm(tempArray);
    } else {
      setCompletedForm([...completedForm, { questions: question, answers: event }]);
    }
  };

  const handleListChange = async (event, question) => {
    console.log(event);
    if (!completedForm.length) {
      setCompletedForm([{ questions: question, answers: event }]);
    } else if (completedForm.some((elt) => elt.questions === question)) {
      let index = completedForm.findIndex((elt) => elt.questions === question);
      let tempArray = completedForm;
      console.log(tempArray);
      console.log(completedForm);
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
          <h1>Remplissez ce formulaire et nous vous enverrons les devis dans les plus brefs délais</h1>
          <Card className={styles.bodyDevisAllQuestions}>
            <Form onSubmit={handleSubmit(formSubmit)} className={styles.containerDevisAllQuestions}>
              {form.map((elt, index) => (
                <div key={index}>{DevisForm(elt)}</div>
              ))}
              <Button variant="primary" type="submit">
                Valider
              </Button>
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
    paths: [],
    fallback: true,
  };
}

export default DevisAllQuestions;
