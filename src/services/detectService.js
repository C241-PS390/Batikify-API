const { getFirestore } = require('firebase-admin/firestore');
const { getEncyclopediaById } = require('./encyclopediaService');
const db = getFirestore();

async function storeDetectHistory(userId, data) {
  try {
    const userHistoryRef = db.collection('usersData').doc(userId).collection('detectionHistories');
    const detectHistory = await userHistoryRef.doc(data.id).set(data);
    return detectHistory.id;
  } catch (error) {
    throw error;
  }
}

async function getAllDetectHistories(userId) {
  try {
    const userHistoryRef = db.collection('usersData').doc(userId).collection('detectionHistories');
    const detectHistories = await userHistoryRef.orderBy('createdAt', 'desc').get();

    const data = await Promise.all(
      detectHistories.docs.map(async (doc) => {
        const encyclopediaData = await getEncyclopediaById(doc.data().result);

        return {
          id: doc.id,
          result: encyclopediaData.name,
          origin: encyclopediaData.origin,
          description: encyclopediaData.description,
          imageUrl: encyclopediaData.imageUrl,
          photoUrl: doc.data().imageUrl,
          createdAt: doc.data().createdAt.toDate(),
        };
      }),
    );

    return data;
  } catch (error) {
    throw error;
  }
}

async function getDetectHistoryById(userId, historyId) {
  try {
    const userHistoryRef = db.collection('usersData').doc(userId).collection('detectionHistories');
    const detectHistory = await userHistoryRef.doc(historyId).get();
    const encyclopediaData = await getEncyclopediaById(detectHistory.data().result);

    if (!detectHistory.exists) {
      return null;
    }

    historyData = {
      result: encyclopediaData.name,
      origin: encyclopediaData.origin,
      description: encyclopediaData.description,
      imageUrl: encyclopediaData.imageUrl,
      photoUrl: detectHistory.data().imageUrl,
      createdAt: detectHistory.data().createdAt.toDate(),
    };

    return historyData;
  } catch (error) {
    throw error;
  }
}

module.exports = { storeDetectHistory, getAllDetectHistories, getDetectHistoryById };
