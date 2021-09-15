import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { FETCH_ALL } from '../queries/general';
import { CREATE_MOVIE } from '../queries/movie';
import { Form, Button, Row, Col } from 'react-bootstrap';

export default () => {
  const history = useHistory();

  const [actionSubmit] = useMutation(CREATE_MOVIE, {
    refetchQueries: [
      {
        query: FETCH_ALL,
      },
    ],
  });

  const [form, setForm] = useState({
    title: '',
    overview: '',
    poster_path: '',
    popularity: 0,
    tags: [],
  });
  const [tag, setTag] = useState('');

  const onChangeForm = (event) => {
    const { name, value } = event.target;
    const _form = {
      ...form,
      [name]: [name] == 'popularity' ? +value : value,
    };
    setForm(_form);
  };

  const deleteTag = (idx) => {
    const _temp = [...form.tags];
    _temp.splice(idx, 1);
    setForm({ ...form, tags: _temp });
  };

  const changeTag = (event) => {
    setTag(event.target.value);
  };

  const addTag = () => {
    const _temp = [...form.tags];
    _temp.push(tag);
    setForm({ ...form, tags: _temp });
    setTag('');
  };

  const submitAdd = (event) => {
    event.preventDefault();
    const dataSubmission = { ...form };
    console.log(dataSubmission);
    actionSubmit({
      variables: {
        movie: dataSubmission,
      },
    })
      .then((_) => {
        history.push('/');
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Form className="mt-5" onSubmit={submitAdd}>
        <Form.Group as={Row}>
          <Form.Label column sm="3">
            Title
          </Form.Label>
          <Col sm="9">
            <Form.Control type="text" name="title" value={form.title} onChange={onChangeForm} required />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="3">
            Overview
          </Form.Label>
          <Col sm="9">
            <Form.Control
              as="textarea"
              name="overview"
              rows="3"
              value={form.overview}
              onChange={onChangeForm}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="3">
            Poster Path
          </Form.Label>
          <Col sm="9">
            <Form.Control type="url" name="poster_path" value={form.poster_path} onChange={onChangeForm} required />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="3">
            Popularity
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="number"
              step=".1"
              name="popularity"
              value={form.popularity}
              onChange={onChangeForm}
              min="0"
              max="10"
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="3">
            Tags
          </Form.Label>
          <Col sm="5">
            <Form.Control type="text" value={tag} onChange={changeTag} />
          </Col>
          <Col sm="4">
            <Button onClick={addTag}>Add</Button>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col sm="3"></Col>
          <Col sm="9">
            {form.tags.length < 1 ? (
              <p>...</p>
            ) : (
              form.tags.map((tag, idx) => (
                <Button
                  variant="warning"
                  className="ml-2"
                  key={idx}
                  onClick={() => {
                    deleteTag(idx);
                  }}
                >
                  {tag}
                  <span className="ml-3">x</span>
                </Button>
              ))
            )}
          </Col>
        </Form.Group>

        <div className="text-center">
          <Button className="mt-5" variant="primary" type="submit">
            Submit Data
          </Button>
        </div>
      </Form>
    </>
  );
};
