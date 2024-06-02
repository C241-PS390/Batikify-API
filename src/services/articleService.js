const { getFirestore } = require('firebase-admin/firestore');
const db = getFirestore();

const addArticle = async (articleId, title, content, publicationDate, category, tags) => {
  const articleData = {
    articleId,
    title,
    content,
    publicationDate,
    category,
    tags,
  };

  const articleRef = db.collection('articles').doc(articleId);
  await articleRef.set(articleData);

  return articleData;
};

async function getArticleById(articleId) {
  const articleDoc = await db.collection('articles').doc(articleId).get();
  if (!articleDoc.exists) {
    throw new Error('Artilcle not found');
  }
  return articleDoc.data();
}

async function getAllArticles() {
  try {
    const articlesSnapshot = await db.collection('articles').get();
    const articles = [];
    articlesSnapshot.forEach((doc) => {
      articles.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return articles;
  } catch (error) {
    throw error;
  }
}

module.exports = { addArticle, getArticleById, getAllArticles };
