import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams, useHistory } from 'react-router-dom';
import { FETCH_TV_SERIAL, DELETE_TV_SERIES } from '../queries/tv';
import { FETCH_ALL } from '../queries/general';
import { GET_FAVORITES } from '../queries/favorite';
import { favorites } from '../config/graphql';

// Import Components
import CardDetail from '../components/CardDetail';

export default () => {
  const history = useHistory();
  const params = useParams();

  const { loading: loadingFavorites, error: errorFavorites, data: listFavorites } = useQuery(GET_FAVORITES);
  const { loading, error, data } = useQuery(FETCH_TV_SERIAL, {
    variables: {
      id: params.id,
    },
  });

  const [deleteMovie] = useMutation(DELETE_TV_SERIES, {
    refetchQueries: [
      {
        query: FETCH_ALL,
      },
    ],
  });

  const actionDelete = (event) => {
    event.preventDefault();
    deleteMovie({
      variables: {
        id: params.id,
      },
    })
      .then((_) => {
        history.push('/tv');
      })
      .catch((err) => console.log(err));
  };

  const actionFavorites = (event) => {
    event.preventDefault();
    let _temp = favorites();
    if (_temp.includes(params.id)) {
      _temp = _temp.filter((el) => el !== params.id);
    } else {
      _temp = [..._temp, params.id];
    }
    favorites(_temp);
  };

  if (loading || loadingFavorites) return <p>Loading... Please Wait</p>;
  if (error || errorFavorites) return <p>Ooops.. there's an error, {error.message}</p>;

  return (
    <div>
      <h2 style={{ margin: '50px', textAlign: 'center' }}>{data.tvSerial.title}</h2>
      <CardDetail
        data={data.tvSerial}
        favorites={listFavorites}
        deleteAction={actionDelete}
        favoritesAction={actionFavorites}
      />
    </div>
  );
};
