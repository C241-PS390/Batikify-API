const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.PROJECT_ID,
});

const historyDetectionBucket = admin.storage().bucket(process.env.HISTORY_STORAGE_NAME);

module.exports = { admin, historyDetectionBucket };
