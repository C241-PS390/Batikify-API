const express = require('express');
const rootRoute = express.Router();

rootRoute.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome on root',
  });
});

rootRoute.get('/debug-env', (req, res) => {
  res.status(200).json({
    message: `Running on port ${process.env.JWT_SECRET}`,
  });
});

module.exports = rootRoute;
