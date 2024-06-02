const express = require("express");
const router = express.Router();
const {
  addArticle,
  getArticleById,
  getAllArticles,
} = require("../services/articleService");

router.post("/addArticle", async (req, res) => {
  const { articleId, title, content, publicationDate, category, tags } =
    req.body;
  try {
    const result = await addArticle(
      articleId,
      title,
      content,
      publicationDate,
      category,
      tags
    );
    res.status(201).json(result);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to add article", error: error.message });
  }
});

router.get("/getArticle/:articleId", async (req, res) => {
  const { articleId } = req.params;
  try {
    const result = await getArticleById(articleId);
    if (result.status === "error") {
      res.status(404).json(result);
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve article",
      error: error.message,
    });
  }
});

router.get("/getAllArticles", async (req, res) => {
  try {
    const result = await getAllArticles();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve articles",
      error: error.message,
    });
  }
});

module.exports = router;
