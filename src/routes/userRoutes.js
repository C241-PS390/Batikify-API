const express = require('express');
const { validateRegistration, validateLogin } = require('../middlewares/userValidation');
const verifyToken = require('../middlewares/verifyToken');
const {
  registerController,
  loginController,
  profileController,
  logoutController,
} = require('../controllers/userContoller');
const router = express.Router();

router.post('/register', validateRegistration, registerController);
router.post('/login', validateLogin, loginController);

// get profile
router.get('/', verifyToken, profileController);
router.post('/logout', verifyToken, logoutController);

module.exports = router;
