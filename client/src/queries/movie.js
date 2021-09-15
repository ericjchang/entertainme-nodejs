import { gql } from '@apollo/client';

export const FETCH_MOVIES = gql`
  query {
    movies {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const FETCH_MOVIE = gql`
  query($id: ID!) {
    movie(id: $id) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const CREATE_MOVIE = gql`
  mutation($movie: MovieInput!) {
    addMovie(movie: $movie) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const UPDATE_MOVIE = gql`
  mutation($id: ID!, $movie: MovieInput!) {
    updateMovie(id: $id, movie: $movie) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const DELETE_MOVIE = gql`
  mutation($id: ID!) {
    deleteMovie(id: $id)
  }
`;
