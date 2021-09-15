const routes = require('express').Router();
const entertainmeRouter = require('./entertainme');
const moviesRouter = require('./movie');
const tvRouter = require('./tv');

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

routes.use('/entertainme', entertainmeRouter);
routes.use('/movies', moviesRouter);
routes.use('/tv', tvRouter);

module.exports = routes;
