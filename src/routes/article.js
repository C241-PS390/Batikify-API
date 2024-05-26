const express = require('express');
const { getAllArticles, getArticleByID } = require('../services/firestore');
const articleRoutes = express.Router();

articleRoutes.get('/', async (req, res) => {
  const data = await getAllArticles();

  res.status(200).json({
    status: 'success',
    message: 'Data berhasil diambil',
    data,
  });
});

articleRoutes.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const article = await getArticleByID(id);

    if (!article) {
      return res.status(404).json({
        status: 'fail',
        message: 'Tidak ada data',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Data berhasil diambil',
      data: article,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
});

module.exports = articleRoutes;
