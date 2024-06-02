const express = require('express');
const router = express.Router();
const { addArticle, getArticleById, getAllArticles } = require('../services/articleService');

router.post('/addArticle', async (req, res) => {
  const { articleId, title, content, publicationDate, category, tags } = req.body;
  try {
    const result = await addArticle(articleId, title, content, publicationDate, category, tags);
    res.status(201).json({
      status: 'success',
      message: 'Article succesfully added',
      data: result,
    });
  } catch (error) {
    res
      .status(400)
      .json({ status: 'fail', message: 'Failed to add article', error: error.message });
  }
});

router.get('/getArticle/:articleId', async (req, res) => {
  const { articleId } = req.params;
  try {
    const article = await getArticleById(articleId);

    res.status(200).json({
      status: 'success',
      message: 'Articles retrieved successfully',
      data: article,
    });
  } catch (error) {
    if (error.message === 'Article not found') {
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

router.get('/getAllArticles', async (req, res) => {
  try {
    const articles = await getAllArticles();
    res.status(200).json({
      status: 'success',
      message: 'Articles retrieved successfully',
      data: articles,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve articles',
      error: error.message,
    });
  }
});

module.exports = router;
