const jwt = require('jsonwebtoken');
const { getFirestore } = require('firebase-admin/firestore');
const { getUserByEmail } = require('../services/userService');
const db = getFirestore();

async function verifyToken(req, res, next) {
  const token = req.headers['authorization'];

  try {
    if (!token) {
      throw new Error('Tidak ada token');
    }

    const savedToken = await db.collection('blacklistedTokens').doc(token).get();
    if (savedToken.exists) {
      throw new Error('Token sudah kadaluarsa');
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        throw err;
      }

      const user = await getUserByEmail(decoded.id);
      if (!user) {
        throw new Error('Pengguna tidak ditemukan');
      }

      req.user = {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      };
      next();
    });
  } catch (error) {
    let errorStatus;
    if (error.message === 'Pengguna tidak ditemukan') {
      errorStatus = 404;
    } else if (error.message === 'Token sudah kadaluarsa') {
      errorStatus = 401;
    } else if (error.message === 'Tidak ada token') {
      errorStatus = 403;
    } else {
      errorStatus = 500;
    }

    res.status(errorStatus).json({
      status: 'error',
      message: 'Gagal autentikasi token',
      error: error.message,
    });
  }
}

module.exports = verifyToken;
