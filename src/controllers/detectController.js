const { getFirestore } = require('firebase-admin/firestore');
const { randomUUID } = require('crypto');
const uploadFile = require('../services/multerService');
const detectBatik = require('../services/inferenceService');
const uploadToBucket = require('../services/uploadFileService');
const { getEncyclopediaById } = require('../services/encyclopediaService');
const {
  storeDetectHistory,
  getAllDetectHistories,
  getDetectHistoryById,
} = require('../services/detectService');

const db = getFirestore();

const storeDetectionController = async (req, res) => {
  try {
    await uploadFile(req, res);
    const model = req.model;

    if (!req.file) {
      return res.status(400).json({
        status: 'fail',
        message: 'No file uploaded',
      });
    }

    const imageBuffer = req.file.buffer;

    await db.runTransaction(async () => {
      const { confidenceScore, label } = await detectBatik(model, imageBuffer);

      const docId = randomUUID();
      const userId = req.user.id;
      const fileName = `${docId}-${userId}-${label}.jpg`;
      const imageUrl = await uploadToBucket(userId, req.file, fileName);

      const resultDoc = await getEncyclopediaById(label);

      let data = {
        id: docId,
        result: label,
        createdAt: new Date(),
        imageUrl,
      };
      const historyId = await storeDetectHistory(userId, data);

      res.status(201).json({
        status: 'success',
        message:
          confidenceScore > 95
            ? 'Prediksi berhasil'
            : 'Prediksi berhasil, namun di bawah ambang batas',
        data: {
          historyId,
          imageUrl,
          name: resultDoc.name,
          origin: resultDoc.origin,
          description: resultDoc.description,
        },
      });
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

const getAllDetectHistoriesController = async (req, res) => {
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
};

const getDetectHistoryByIdController = async (req, res) => {
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
};

module.exports = {
  storeDetectionController,
  getAllDetectHistoriesController,
  getDetectHistoryByIdController,
};
