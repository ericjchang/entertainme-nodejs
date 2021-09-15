require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002;
const mongo = require('./config/config.js');

mongo.connect((err) => {
  if (!err) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    const routes = require('./routes');
    app.use(routes);

    app.listen(PORT, () => {
      console.log(`Server TV_Series run on http://localhost:${PORT}`);
    });
  }
});
