const express = require('express');
const {
  storeDetectHistory,
  getAllDetectHistories,
  getDetectHistoryByID,
} = require('../services/firestore');
const detectRoute = express.Router();

detectRoute.post('/', async (req, res) => {
  let data = {
    result: 'X',
    explanation: 'X',
    createdAt: 'X',
    articleRedirect: 'X',
  };

  try {
    const id = await storeDetectHistory(data);

    res.status(201).json({
      status: 'success',
      message: 'History successfully added',
      data: {
        id,
        ...data,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
});

detectRoute.get('/histories', async (req, res) => {
  const data = await getAllDetectHistories();

  res.status(200).json({
    status: 'success',
    message: 'Data berhasil diambil',
    data,
  });
});

detectRoute.get('/histories/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const history = await getDetectHistoryByID(id);

    if (!history) {
      return res.status(404).json({
        status: 'fail',
        message: 'Tidak ada data',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Data berhasil diambil',
      data: history,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
});

module.exports = detectRoute;
