import React from 'react';
import { useQuery } from '@apollo/client';
import { FETCH_ALL } from '../queries/general';

// import components
import CardDeck from '../components/CardDeck';

export default () => {
  const { loading, error, data } = useQuery(FETCH_ALL);

  if (loading) return <p>Loading... Please Wait</p>;
  if (error) return <p>Ooops.. there's an error, {error.message}</p>;

  return (
    <>
      <h3 style={{ margin: ' 20px', textAlign: 'center' }}>Movies</h3>
      <CardDeck data={data.movies} />
      <h3 style={{ margin: ' 20px', textAlign: 'center' }}>TV Series</h3>
      <CardDeck data={data.tvSeries} />
    </>
  );
};
