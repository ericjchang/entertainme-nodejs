'use strict';
const { gql } = require('apollo-server');
const axios = require('axios');
const Redis = require('ioredis');
const redis = new Redis(6379, 'redis');

const baseUrl = process.env.MOVIES_SERVICES_PATH;

const typeDefs = gql`
  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  input MovieInput {
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float
    tags: [String]
  }

  extend type Query {
    movies: [Movie]
    movie(id: ID!): Movie
  }

  extend type Mutation {
    addMovie(movie: MovieInput!): Movie
    updateMovie(id: ID!, movie: MovieInput!): Movie
    deleteMovie(id: ID!): Int
  }
`;

const resolvers = {
  Query: {
    movies: async () => {
      const cache = await redis.get('movies');
      if (cache) return JSON.parse(cache);
      else {
        const { data } = await axios.get(baseUrl);
        redis.set('movies', JSON.stringify(data));
        return data;
      }
    },
    movie: (_, args) => {
      const { id } = args;
      return axios({
        method: 'GET',
        url: `${baseUrl}/${id}`,
      })
        .then(({ data }) => {
          return data;
        })
        .catch((err) => console.log(err));
    },
  },

  Mutation: {
    addMovie: (_, args) => {
      const { movie } = args;

      return axios({
        method: 'POST',
        url: baseUrl,
        data: movie,
      })
        .then(({ data }) => {
          redis.get('movies', (err, result) => {
            if (err) console.log(err);
            else {
              const newMovies = JSON.parse(result);
              newMovies.push(data.ops[0]);
              redis.set('movies', JSON.stringify(newMovies));
            }
          });
          return data.ops[0];
        })
        .catch((err) => console.log(err));
    },

    updateMovie: (_, args) => {
      const { id, movie } = args;
      return axios({
        method: 'PUT',
        url: `${baseUrl}/${id}`,
        data: movie,
      })
        .then(({ config }) => {
          redis.get('movies', (err, result) => {
            if (err) console.log(err);
            else {
              let newMovies = JSON.parse(result);
              let movieData = {
                _id: id,
                ...JSON.parse(config.data),
              };
              newMovies.forEach((el, idx) => {
                if (el._id === id) {
                  newMovies[idx] = movieData;
                }
              });
              redis.set('movies', JSON.stringify(newMovies));
            }
          });
          return JSON.parse(config.data);
        })
        .catch((err) => console.log(err));
    },

    deleteMovie: (_, args) => {
      const { id } = args;

      return axios({
        method: 'delete',
        url: `${baseUrl}/${id}`,
      })
        .then(({ data }) => {
          redis.del('movies');
          return data.deletedCount;
        })
        .catch((err) => console.log(err));
    },
  },
};

module.exports = { typeDefs, resolvers };
