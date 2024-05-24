const express = require('express');
const storeHistory = require('../services/firestore');
const historyRoute = express.Router();

historyRoute.post('/', async (req, res) => {
  let data = {
    id: '1',
    name: 'History Test',
    description: 'Ini tes history',
  };

  await storeHistory(data.id, data);

  res.status(201).json({
    status: 'success',
    message: 'Test successfully added',
    data,
  });
});

module.exports = historyRoute;
