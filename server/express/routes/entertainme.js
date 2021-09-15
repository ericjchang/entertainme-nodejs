const routes = require('express').Router();
const Controller = require('../controllers/entertainme');

routes.get('/', Controller.find);

module.exports = routes;
