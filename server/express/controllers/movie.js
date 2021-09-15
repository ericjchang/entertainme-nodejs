'use strict';
const axios = require('axios');
const Redis = require('ioredis');
const redis = new Redis();

class MovieController {
  static create(req, res, next) {
    const data = {
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      popularity: req.body.popularity,
      tags: req.body.tags,
    };

    axios({
      method: 'POST',
      url: 'http://localhost:3001',
      data: data,
    }).then((response) => {
      redis.del('movies');
      res.status(201).json(response.data);
    });
  }
  static update(req, res, next) {
    const { id } = req.params;
    const data = {
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      popularity: req.body.popularity,
      tags: req.body.tags,
    };

    axios({
      method: 'PUT',
      url: `http://localhost:3001/${id}`,
      data: data,
    }).then((response) => {
      redis.del('movies');
      res.status(200).json(response.data);
    });
  }
  static remove(req, res, next) {
    const { id } = req.params;
    axios({
      method: 'DELETE',
      url: `http://localhost:3001/${id}`,
    }).then((response) => {
      redis.del('movies');
      res.status(200).json(response.data);
    });
  }
}

module.exports = MovieController;
