const { getFirestore } = require('firebase-admin/firestore');
const db = getFirestore();

async function storeDetectHistory(userId, data) {
  try {
    const userHistoryRef = db.collection('usersData').doc(userId).collection('detectionHistories');
    const detectHistory = await userHistoryRef.add(data);
    return detectHistory.id;
  } catch (error) {
    throw error;
  }
}

async function getAllDetectHistories(userId) {
  try {
    const userHistoryRef = db.collection('usersData').doc(userId).collection('detectionHistories');
    const detectHistories = await userHistoryRef.get();

    const data = detectHistories.docs.map((doc) => ({
      id: doc.id,
      history: doc.data(),
    }));

    return data;
  } catch (error) {
    throw error;
  }
}

async function getDetectHistoryById(userId, historyId) {
  try {
    const userHistoryRef = db.collection('usersData').doc(userId).collection('detectionHistories');
    const detectHistory = await userHistoryRef.doc(historyId).get();

    if (!detectHistory.exists) {
      return null;
    }

    return detectHistory.data();
  } catch (error) {
    throw error;
  }
}

module.exports = { storeDetectHistory, getAllDetectHistories, getDetectHistoryById };
