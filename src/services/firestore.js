const Firestore = require('@google-cloud/firestore');
const db = new Firestore({ projectId: process.env.PROJECT_ID });

/*
 * Save detection result to Firestore document named 'histories'
 */
async function storeDetectHistory(userId, data) {
  try {
    const userHistoryRef = db.collection('histories').doc(userId).collection('userHistories');
    const res = await userHistoryRef.add(data);
    return res.id;
  } catch (error) {
    throw error;
  }
}

/*
 * Get all detection result from Firestore document named 'histories'
 */
async function getAllDetectHistories(userId) {
  const userHistoryRef = db.collection('histories').doc(userId).collection('userHistories');
  const snapshot = await userHistoryRef.get();

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    history: doc.data(),
  }));

  return data;
}

/*
 * Get a detail detection result from Firestore document named 'histories'
 */
async function getDetectHistoryByID(userId, id) {
  try {
    const userHistoryRef = db.collection('histories').doc(userId).collection('userHistories');
    const doc = await userHistoryRef.doc(id).get();

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

/*
 * Get user by email
 */
async function getUserByEmail(email) {
  const userRef = db.collection('users').where('email', '==', email);
  const snapshot = await userRef.get();

  if (snapshot.empty) {
    return null;
  }

  const user = snapshot.docs[0];
  return { id: user.id, ...user.data() };
}

/*
 * Create new user
 */
async function storeUser(data) {
  try {
    db.collection('users').doc(data.email).set(data);
  } catch (error) {
    throw error;
  }
}

/*
 * Store token after logout to blacklistedTokens
 */
async function storeBlacklistedToken(data) {
  try {
    db.collection('blacklistedTokens').doc(data.token).set(data);
  } catch (error) {
    throw error;
  }
}

/*
 * Get specified blacklisted token
 */
async function getBlacklistedTokenByToken(data) {
  return db.collection('blacklistedTokens').doc(data).get();
}

module.exports = {
  storeDetectHistory,
  getAllDetectHistories,
  getDetectHistoryByID,
  getAllArticles,
  getArticleByID,
  getUserByEmail,
  storeUser,
  storeBlacklistedToken,
  getBlacklistedTokenByToken,
};
