const admin = require("./admin");
async function registerUser(email, password) {
  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
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
    return { success: true, message: "Logout successful" };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
