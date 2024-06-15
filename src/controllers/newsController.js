const getNewsInfo = require('../services/searchNews');

const newsController = async (req, res) => {
  const { page, searchQuery } = req.query;
  const news = await getNewsInfo(page, searchQuery);

  res.status(200).json({
    status: 'success',
    message: 'News retrieved successfully',
    data: news,
  });
};

module.exports = { newsController };
