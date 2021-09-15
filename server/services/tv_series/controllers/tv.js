'use strict';
const Tv = require('../models/tv');

class TvController {
  static find(req, res, next) {
    Tv.find()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
      });
  }

  static findById(req, res, next) {
    const { id } = req.params;
    Tv.findById(id)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
      });
  }

  static create(req, res, next) {
    const data = {
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      popularity: req.body.popularity,
      tags: req.body.tags,
    };

    Tv.create(data)
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
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

    Tv.findByIdAndUpdate(id, data)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
      });
  }

  static remove(req, res, next) {
    const { id } = req.params;
    Tv.findByIdAndDelete(id)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
      });
  }
}

module.exports = TvController;
