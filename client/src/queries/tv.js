import { gql } from '@apollo/client';

export const FETCH_TV_SERIES = gql`
  query {
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

export const FETCH_TV_SERIAL = gql`
  query($id: ID!) {
    tvSerial(id: $id) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const CREATE_TV_SERIES = gql`
  mutation($tvSerial: TvSeriesInput!) {
    addTvSeries(tvSerial: $tvSerial) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const UPDATE_TV_SERIES = gql`
  mutation($id: ID!, $tvSerial: TvSeriesInput!) {
    updateTvSeries(id: $id, tvSerial: $tvSerial) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const DELETE_TV_SERIES = gql`
  mutation($id: ID!) {
    deleteTvSeries(id: $id)
  }
`;
