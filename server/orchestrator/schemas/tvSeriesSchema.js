'use strict';
const { gql } = require('apollo-server');
const axios = require('axios');
const Redis = require('ioredis');
const redis = new Redis(6379, 'redis');

const baseUrl = process.env.TV_SERIES_SERVICES_PATH;

const typeDefs = gql`
  type TvSeries {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  input TvSeriesInput {
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float
    tags: [String]
  }

  extend type Query {
    tvSeries: [TvSeries]
    tvSerial(id: ID!): TvSeries
  }

  extend type Mutation {
    addTvSeries(tvSerial: TvSeriesInput!): TvSeries
    updateTvSeries(id: ID!, tvSerial: TvSeriesInput!): TvSeries
    deleteTvSeries(id: ID!): Int
  }
`;

const resolvers = {
  Query: {
    tvSeries: async () => {
      const cache = await redis.get('tvSeries');
      if (cache) return JSON.parse(cache);
      else {
        const { data } = await axios.get(baseUrl);
        redis.set('tvSeries', JSON.stringify(data));
        return data;
      }
    },
    tvSerial: (_, args) => {
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
    addTvSeries: (_, args) => {
      const { tvSerial } = args;

      return axios({
        method: 'POST',
        url: baseUrl,
        data: tvSerial,
      })
        .then(({ data }) => {
          redis.get('tvSeries', (err, result) => {
            if (err) console.log(err);
            else {
              const newTvSeries = JSON.parse(result);
              newTvSeries.push(data.ops[0]);
              redis.set('tvSeries', JSON.stringify(newTvSeries));
            }
          });
          return data.ops[0];
        })
        .catch((err) => console.log(err));
    },

    updateTvSeries: (_, args) => {
      const { id, tvSerial } = args;
      return axios({
        method: 'PUT',
        url: `${baseUrl}/${id}`,
        data: tvSerial,
      })
        .then(({ config }) => {
          redis.get('tvSeries', (err, result) => {
            if (err) console.log(err);
            else {
              const newTvSeries = JSON.parse(result);
              let tvData = {
                _id: id,
                ...JSON.parse(config.data),
              };
              newTvSeries.forEach((el, idx) => {
                if (el._id === id) {
                  newTvSeries[idx] = tvData;
                }
              });

              redis.set('tvSeries', JSON.stringify(newTvSeries));
            }
          });
          return JSON.parse(config.data);
        })
        .catch((err) => console.log(err));
    },

    deleteTvSeries: (_, args) => {
      const { id } = args;

      return axios({
        method: 'DELETE',
        url: `${baseUrl}/${id}`,
      })
        .then((data) => {
          redis.del('tvSeries');
          return data.deletedCount;
        })
        .catch((err) => console.log(err));
    },
  },
};

module.exports = { typeDefs, resolvers };
