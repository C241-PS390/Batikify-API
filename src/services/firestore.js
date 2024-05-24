const Firestore = require('@google-cloud/firestore');
const db = new Firestore();

async function storeHistory(id, data) {
  const res = db.collection('histories').doc(id).set(data);
  return res;
}

module.exports = storeHistory;
