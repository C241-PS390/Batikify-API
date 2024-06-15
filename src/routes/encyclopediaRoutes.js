const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const {
  getAllEncyclopediaController,
  getEncyclopediaByIdController,
} = require('../controllers/encyclopediaController');
const router = express.Router();

router.get('/', verifyToken, getAllEncyclopediaController);
router.get('/:encyclopediaId', verifyToken, getEncyclopediaByIdController);

module.exports = router;
