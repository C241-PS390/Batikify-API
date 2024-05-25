const Firestore = require('@google-cloud/firestore');
const db = new Firestore({ projectId: process.env.PROJECT_ID });

async function storeHistory(id, data) {
  const res = db.collection('histories').doc(id).set(data);
  return res;
}

module.exports = storeHistory;
