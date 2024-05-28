const jwt = require('jsonwebtoken');
const { getUserByEmail, getBlacklistedTokenByToken } = require('../services/firestore');

async function verifyToken(req, res, next) {
  const token = req.headers['x-access-token'] || req.headers['authorization'];

  if (!token) {
    return res.status(403).json({
      status: 'fail',
      message: 'Tidak ada token',
    });
  }

  try {
    const savedToken = await getBlacklistedTokenByToken(token);
    if (savedToken.exists) {
      return res.status(401).json({
        status: 'fail',
        message: 'Token sudah kadaluarsa',
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(500).json({
          status: 'fail',
          message: 'Gagal autentikasi token',
        });
      }

      try {
        const user = await getUserByEmail(decoded.id);
        if (!user) {
          return res.status(404).json({
            status: 'fail',
            message: 'Pengguna tidak ditemukan',
          });
        }

        req.user = {
          email: user.email,
          fullName: user.fullName,
        };
        next();
      } catch (error) {
        return res.status(500).json({
          status: 'error',
          message: 'Gagal mengambil data pengguna',
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Gagal mengecek token',
    });
  }
}

module.exports = verifyToken;
