const Firestore = require('@google-cloud/firestore');
const db = new Firestore({ projectId: process.env.PROJECT_ID });

/*
 * Save detection result to Firestore document named 'histories'
 */
async function storeDetectHistory(data) {
  try {
    const res = db.collection('histories').add(data);
    return res.id;
  } catch (error) {
    throw error;
  }
}

/*
 * Get all detection result from Firestore document named 'histories'
 */
async function getAllDetectHistories() {
  const snapshot = await db.collection('histories').get();

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    history: doc.data(),
  }));

  return data;
}

/*
 * Get a detail detection result from Firestore document named 'histories'
 */
async function getDetectHistoryByID(id) {
  try {
    const doc = await db.collection('histories').doc(id).get();

    if (!doc.exists) {
      return null;
    }
    return doc.data();
  } catch (error) {
    throw error;
  }
}

/*
 * Get all articles from Firestore document named 'articles'
 */
async function getAllArticles() {
  const snapshot = await db.collection('articles').get();

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    article: doc.data(),
  }));

  return data;
}

/*
 * Get a detail article from Firestore document named 'articles'
 */
async function getArticleByID(id) {
  try {
    const doc = await db.collection('articles').doc(id).get();

    if (!doc.exists) {
      return null;
    }
    return doc.data();
  } catch (error) {
    throw error;
  }
}

module.exports = {
  storeDetectHistory,
  getAllDetectHistories,
  getDetectHistoryByID,
  getAllArticles,
  getArticleByID,
};
