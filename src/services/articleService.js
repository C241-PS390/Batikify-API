const { getFirestore } = require("firebase-admin/firestore");
const db = getFirestore();

const addArticle = async (
  articleId,
  title,
  content,
  publicationDate,
  category,
  tags
) => {
  const articleData = {
    status: "Posted",
    message: "Created successfully",
    data: {
      articleId,
      title,
      content,
      publicationDate,
      category,
      tags,
    },
  };

  const articleRef = db.collection("articles").doc(articleId);
  await articleRef.set(articleData);

  return articleData;
};

async function getArticleById(articleId) {
  try {
    const articleDoc = await db.collection("articles").doc(articleId).get();
    if (!articleDoc.exists) {
      return { status: "error", message: "Article not found" };
    }
    return {
      status: "success",
      message: "Article retrieved successfully",
      data: articleDoc.data(),
    };
  } catch (error) {
    throw error;
  }
}

async function getAllArticles() {
  try {
    const articlesSnapshot = await db.collection("articles").get();
    const articles = [];
    articlesSnapshot.forEach((doc) => {
      articles.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return {
      status: "success",
      message: "Articles retrieved successfully",
      data: articles,
    };
  } catch (error) {
    throw error;
  }
}

module.exports = { addArticle, getArticleById, getAllArticles };
