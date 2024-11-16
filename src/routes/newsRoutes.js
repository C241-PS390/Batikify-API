const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const { newsController } = require('../controllers/newsController');
const newsRoutes = express.Router();

newsRoutes.get('/', verifyToken, newsController);

module.exports = newsRoutes;
