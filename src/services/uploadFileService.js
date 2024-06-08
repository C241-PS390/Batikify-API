const { format } = require('util');
const { imageDetectionBucket } = require('../services/admin');

async function uploadToBucket(userId, file) {
  try {
    if (!file) {
      throw new Error('No file');
    }

    const blob = imageDetectionBucket.file(`${userId}/${file.originalname}`);
    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    return new Promise((resolve, reject) => {
      blobStream.on('error', (err) => {
        reject(err);
      });

      blobStream.on('finish', () => {
        const publicUrl = format(
          `https://storage.googleapis.com/${imageDetectionBucket.name}/${blob.name}`,
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
