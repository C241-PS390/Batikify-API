const { getFirestore } = require('firebase-admin/firestore');
const _ = require('lodash');
const db = getFirestore();

async function getAllEncyclopedia() {
  try {
    const encyclopediaSnapshot = await db.collection('encyclopedias').get();
    const encyclopedias = [];

    encyclopediaSnapshot.forEach((doc) => {
      encyclopedias.push({
        id: doc.id,
        name: doc.data().name,
        origin: doc.data().origin,
        description: doc.data().description,
      });
    });

    return encyclopedias;
  } catch (error) {
    throw error;
  }
}

async function getEncyclopediaBySlug(slug) {
  const encyclopediaDoc = await db.collection('encyclopedias').where('slug', '==', slug).get();

  if (encyclopediaDoc.empty) {
    throw new Error('Encyclopedia not found!');
  }

  return encyclopediaDoc.docs[0].data();
}

async function searchEncyclopedia(keyword) {
  try {
    const encyclopedias = await getAllEncyclopedia();

    const filteredEncyclopedias = _.filter(encyclopedias, (item) => {
      return item.name.toLowerCase().includes(keyword.toLowerCase());
    });

    return filteredEncyclopedias;
  } catch (error) {
    throw error;
  }
}

async function getEncyclopediaById(encyclopediaId) {
  const encyclopediaDoc = await db.collection('encyclopedias').doc(encyclopediaId).get();

  if (!encyclopediaDoc.exists) {
    throw new Error('Encyclopedia not found!');
  }

  const doc = {
    name: encyclopediaDoc.data().name,
    origin: encyclopediaDoc.data().origin,
    description: encyclopediaDoc.data().description,
  };

  return doc;
}

module.exports = {
  getAllEncyclopedia,
  getEncyclopediaBySlug,
  getEncyclopediaById,
  searchEncyclopedia,
};
