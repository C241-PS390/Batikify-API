const express = require('express');
const {
  storeDetectHistory,
  getAllDetectHistories,
  getDetectHistoryByID,
} = require('../services/firestore');
const verifyToken = require('../middlewares/verifyToken');
const detectRoute = express.Router();

detectRoute.post('/', verifyToken, async (req, res) => {
  let data = {
    result: 'X',
    explanation: 'X',
    createdAt: new Date().toISOString(),
    articleRedirect: 'X',
  };

  try {
    const userId = req.user.email;
    const id = await storeDetectHistory(userId, data);

    res.status(201).json({
      status: 'success',
      message: 'Prediksi berhasil',
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

detectRoute.get('/histories', verifyToken, async (req, res) => {
  try {
    const userId = req.user.email;
    const data = await getAllDetectHistories(userId);

    res.status(200).json({
      status: 'success',
      message: 'Data berhasil diambil',
      data,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
});

detectRoute.get('/histories/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const userId = req.user.email;
    const history = await getDetectHistoryByID(userId, id);

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
