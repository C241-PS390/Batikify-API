const Firestore = require('@google-cloud/firestore');
const db = new Firestore({ projectId: process.env.PROJECT_ID });

async function storeDetectHistory(data) {
  try {
    const res = db.collection('histories').add(data);
    return res.id;
  } catch (error) {
    throw error;
  }
}

async function getAllDetectHistories() {
  const snapshot = await db.collection('histories').get();

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    history: doc.data(),
  }));

  return data;
}

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

module.exports = { storeDetectHistory, getAllDetectHistories, getDetectHistoryByID };
