import { gql } from '@apollo/client';

export const FETCH_ALL = gql`
  query {
    movies {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }

    tvSeries {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;
