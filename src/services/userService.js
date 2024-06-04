const admin = require("./admin");
const { getFirestore, Timestamp } = require("firebase-admin/firestore");
const db = getFirestore();

async function registerUser(email, password, nama) {
  try {
    if (!email || !password || !nama) {
      throw new Error("Email, password, dan nama harus diisi");
    }

    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    const timestamp = admin.firestore.FieldValue.serverTimestamp();

    await db.collection("usersData").doc(userRecord.uid).set({
      email: userRecord.email,
      nama: nama,
      publishedArticle: {},
      history: {},
      createdAt: timestamp,
      lastModifyAt: timestamp,
    });

    return userRecord;
  } catch (error) {
    throw error;
  }
}

async function loginUser(email) {
  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    return userRecord;
  } catch (error) {
    throw error;
  }
}

async function logoutUser() {
  try {
    localStorage.removeItem("firebaseToken");
    return { status: "success", message: "Logout successful" };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
