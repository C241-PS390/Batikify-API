const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.PROJECT_ID,
});

const imageDetectionBucket = admin.storage().bucket('batikify-image-bucket');

module.exports = { admin, imageDetectionBucket };
