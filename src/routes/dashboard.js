const express = require('express');
const dashboardRoute = express.Router();

dashboardRoute.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome on dashboard',
  });
});

module.exports = dashboardRoute;
