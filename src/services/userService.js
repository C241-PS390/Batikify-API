const { admin } = require('./admin');
const { getFirestore } = require('firebase-admin/firestore');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = getFirestore();

async function getUserByEmail(email) {
  const userSnapshot = await db.collection('usersData').where('email', '==', email).get();

  if (userSnapshot.empty) {
    return null;
  }

  const user = userSnapshot.docs[0];
  return { id: user.id, ...user.data() };
}

async function registerUser(email, password, fullName) {
  try {
    const emailTaken = await getUserByEmail(email);
    if (emailTaken) {
      throw new Error('Email sudah digunakan');
    }

    const timestamp = admin.firestore.FieldValue.serverTimestamp();

    const newUser = {
      email,
      password: await bcrypt.hash(password, 8),
      fullName,
      createdAt: timestamp,
      lastModifyAt: timestamp,
    };

    const userDoc = await db.collection('usersData').add(newUser);

    return userDoc.id;
  } catch (error) {
    throw error;
  }
}

async function loginUser(email, password) {
  const errorMessage = 'Email atau password salah';

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      throw new Error(errorMessage);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error(errorMessage);
    }

    let token = jwt.sign(
      {
        id: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: 60 * 60 * 24 * 30,
      },
    );

    return token;
  } catch (error) {
    throw error;
  }
}

async function logoutUser(token) {
  try {
    if (!token) {
      throw new Error('Tidak ada token');
    }

    const decoded = jwt.decode(token);
    if (!decoded) {
      throw new Error('Token invalid');
    }

    const expireDate = new Date(Date.now() + 60 * 60 * 1000);
    const expireAt = admin.firestore.Timestamp.fromDate(expireDate);

    const createdAt = admin.firestore.FieldValue.serverTimestamp();

    const tokenData = {
      token,
      expireAt,
      createdAt,
    };

    await db.collection('blacklistedTokens').doc(token).set(tokenData);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUserByEmail,
};
