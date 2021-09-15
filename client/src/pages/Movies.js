import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Row, Button } from 'react-bootstrap';
import { FETCH_MOVIES } from '../queries/movie';

// import components
import CardDeck from '../components/CardDeck';

export default () => {
  const { loading, error, data } = useQuery(FETCH_MOVIES);

  if (loading) return <p>Loading... Please Wait</p>;
  if (error) return <p>Ooops.. there's an error, {error.message}</p>;

  return (
    <>
      <Row className="mb-3" style={{ float: 'right' }}>
        <Button as={Link} to={'/movies/add'}>
          Add Movies
        </Button>
      </Row>
      <h3 style={{ margin: ' 20px', textAlign: 'center' }}>Movies</h3>
      <CardDeck data={data.movies} />
    </>
  );
};
