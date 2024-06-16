const tf = require('@tensorflow/tfjs-node');
const labelMapping = require('./labelMapping');

async function detectBatik(model, imageBuffer) {
  try {
    const tensor = tf.node
      .decodeImage(imageBuffer)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat();

    const prediction = model.predict(tensor);
    const predictionData = await prediction.data();
    const labels = labelMapping;

    const maxPredictionValue = Math.max(...predictionData);
    const maxPredictionIndex = predictionData.indexOf(maxPredictionValue);
    const confidenceScore = maxPredictionValue * 100;

    return { confidenceScore, label: labels[maxPredictionIndex] };
  } catch (error) {
    throw error;
  }
}

module.exports = detectBatik;
