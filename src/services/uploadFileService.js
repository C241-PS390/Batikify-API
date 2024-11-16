const { format } = require('util');
const { historyDetectionBucket } = require('../services/admin');

async function uploadToBucket(userId, file, fileName) {
  try {
    if (!file) {
      throw new Error('No file');
    }

    const blob = historyDetectionBucket.file(`${userId}/${fileName}`);
    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    return new Promise((resolve, reject) => {
      blobStream.on('error', (err) => {
        reject(err);
      });

      blobStream.on('finish', () => {
        const publicUrl = format(
          `https://storage.googleapis.com/${historyDetectionBucket.name}/${blob.name}`,
        );
        resolve(publicUrl);
      });

      blobStream.end(file.buffer);
    });
  } catch (error) {
    throw error;
  }
}

module.exports = uploadToBucket;
