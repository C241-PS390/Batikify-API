const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const {
  storeDetectHistory,
  getAllDetectHistories,
  getDetectHistoryById,
} = require('../services/detectService');
const uploadToBucket = require('../services/uploadFileService');
const uploadFile = require('../services/multerService');
const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
  await uploadFile(req, res);

  if (!req.file) {
    return res.status(400).json({
      status: 'fail',
      message: 'No file uploaded',
    });
  }

  try {
    const userId = req.user.id;
    const imageUrl = await uploadToBucket(userId, req.file);

    // data demo
    let data = {
      result: 'X',
      explanation: 'X',
      createdAt: new Date(),
      imageUrl,
    };
    const historyId = await storeDetectHistory(userId, data);

    res.status(201).json({
      status: 'success',
      message: 'Prediksi berhasil',
      data: {
        historyId,
        imageUrl,
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

router.get('/histories', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
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

router.get('/histories/:historyId', verifyToken, async (req, res) => {
  const { historyId } = req.params;

  try {
    const userId = req.user.id;
    const history = await getDetectHistoryById(userId, historyId);

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

module.exports = router;
