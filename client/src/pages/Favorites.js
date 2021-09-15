import React from 'react';
import { useQuery } from '@apollo/client';
import { FETCH_MOVIES } from '../queries/movie';
import { FETCH_TV_SERIES } from '../queries/tv';
import { GET_FAVORITES } from '../queries/favorite';
import { CardDeck } from 'react-bootstrap';

// Import components
import Card from '../components/Card';

export default () => {
  const { loading: loadingFavorites, error: errorFavorites, data: listFavorites } = useQuery(GET_FAVORITES);
  const { loading: loadingMovie, error: errorMovie, data: dataMovie } = useQuery(FETCH_MOVIES);
  const { loading: loadingTv, error: errorTv, data: dataTv } = useQuery(FETCH_TV_SERIES);

  if (loadingMovie || loadingTv || loadingFavorites) return <p>Loading... Please Wait</p>;
  if (errorMovie || errorTv || errorFavorites) return <p>Ooops.. there's an error</p>;

  return (
    <>
      {listFavorites.length < 1 && <p>Empty...</p>}

      <h3 style={{ margin: ' 20px', textAlign: 'center' }}>Favorites Movies</h3>
      <CardDeck style={{ display: 'flex', flexDirection: 'row' }}>
        {dataMovie.movies
          .filter((movie) => listFavorites.favorites.includes(movie._id))
          .map((movie) => {
            return <Card key={movie._id} data={movie} />;
          })}
      </CardDeck>
      <h3 style={{ margin: ' 20px', textAlign: 'center' }}>Favorites TV Series</h3>
      <CardDeck style={{ display: 'flex', flexDirection: 'row' }}>
        {dataTv.tvSeries
          .filter((serial) => listFavorites.favorites.includes(serial._id))
          .map((serial) => {
            return <Card key={serial._id} data={serial} />;
          })}
      </CardDeck>
    </>
  );
};
