const express = require('express');
const {
  getAllEncyclopedia,
  getEncyclopediaById,
  searchEncyclopedia,
} = require('../services/encyclopediaService');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
  const { search } = req.query;
  try {
    let encyclopedia;
    if (search) {
      encyclopedia = await searchEncyclopedia(search);
    } else {
      encyclopedia = await getAllEncyclopedia();
    }

    res.status(200).json({
      status: 'success',
      message: 'Encyclopedia retrieved successfully',
      data: encyclopedia,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Fail to get encyclopedia',
      error: error.message,
    });
  }
});

router.get('/:encyclopediaId', verifyToken, async (req, res) => {
  const { encyclopediaId } = req.params;

  try {
    const encyclopedia = await getEncyclopediaById(encyclopediaId);

    res.status(200).json({
      status: 'success',
      message: 'Encyclopedia retrieved successfully',
      data: encyclopedia,
    });
  } catch (error) {
    if (error.message === 'Encyclopedia not found') {
      res.status(404).json({
        status: 'fail',
        message: error.message,
      });
    } else {
      res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }
});

module.exports = router;
