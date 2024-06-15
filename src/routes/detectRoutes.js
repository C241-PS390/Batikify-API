const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const {
  storeDetectionController,
  getAllDetectHistoriesController,
  getDetectHistoryByIdController,
} = require('../controllers/detectController');
const router = express.Router();

router.post('/', verifyToken, storeDetectionController);
router.get('/histories', verifyToken, getAllDetectHistoriesController);
router.get('/histories/:historyId', verifyToken, getDetectHistoryByIdController);

module.exports = router;
