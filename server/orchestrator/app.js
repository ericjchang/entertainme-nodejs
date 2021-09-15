'use strict';
require('dotenv').config();
const { ApolloServer, makeExecutableSchema } = require('apollo-server');
const movieSchema = require('./schemas/movieSchema');
const tvSeriesSchema = require('./schemas/tvSeriesSchema');

const typeDefs = `
  type Query
  type Mutation
`;

const schema = makeExecutableSchema({
  typeDefs: [typeDefs, movieSchema.typeDefs, tvSeriesSchema.typeDefs],

  resolvers: [movieSchema.resolvers, tvSeriesSchema.resolvers],
});

const server = new ApolloServer({ schema });

server.listen().then(({ url }) => {
  console.log(`🚀 GQL Server ready at ${url}`);
});
