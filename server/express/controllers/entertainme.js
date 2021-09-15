'use strict';
const axios = require('axios');
const Redis = require('ioredis');
const redis = new Redis();
class EntertainmeController {
  static async find(req, res, next) {
    const movies = await redis.get('movies');
    const tvSeries = await redis.get('tvSeries');

    if (movies && tvSeries) {
      res.status(200).json({
        movies: JSON.parse(movies),
        tvSeries: JSON.parse(tvSeries),
      });
    } else {
      let reqs = [
        axios({
          method: 'GET',
          url: 'http://localhost:3001',
        }),
        axios({
          method: 'GET',
          url: 'http://localhost:3002',
        }),
      ];
      Promise.all(reqs).then((responses) => {
        redis.set('movies', JSON.stringify(responses[0].data));
        redis.set('tvSeries', JSON.stringify(responses[1].data));
        res.status(200).json({
          movies: responses[0].data,
          tvSeries: responses[1].data,
        });
      });
    }
  }
}

module.exports = EntertainmeController;
