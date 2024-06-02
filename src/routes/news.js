const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const getNewsInfo = require('../services/searchNews');
const newsRoutes = express.Router();

newsRoutes.get('/', verifyToken, async (req, res) => {
  const { page, searchQuery } = req.query;
  const news = await getNewsInfo(page, searchQuery);

  console.log(searchQuery);

  res.status(200).json({
    status: 'success',
    message: 'Berita berhasil diambil',
    data: news,
  });
});

module.exports = newsRoutes;
