const routes = require('express').Router();
const Controller = require('../controllers/tv');

routes.get('/', Controller.find);
routes.get('/:id', Controller.findById);
routes.post('/', Controller.create);
routes.put('/:id', Controller.update);
routes.delete('/:id', Controller.remove);

module.exports = routes;
