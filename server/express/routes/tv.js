const routes = require('express').Router();
const Controller = require('../controllers/tv');

routes.post('/', Controller.create);
routes.put('/:id', Controller.update);
routes.delete('/:id', Controller.remove);

module.exports = routes;
