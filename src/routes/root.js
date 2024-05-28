const express = require('express');
const rootRoute = express.Router();

rootRoute.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome on root',
  });
});

module.exports = rootRoute;
