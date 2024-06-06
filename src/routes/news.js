const express = require('express');
const getNewsInfo = require('../services/searchNews');
const verifyToken = require('../middlewares/verifyToken');
const newsRoutes = express.Router();

newsRoutes.get('/', verifyToken, async (req, res) => {
  const { page, searchQuery } = req.query;
  const news = await getNewsInfo(page, searchQuery);

  res.status(200).json({
    status: 'success',
    message: 'News retrieved successfully',
    data: news,
  });
});

module.exports = newsRoutes;
