const express = require('express');

const router = express.Router();
const {
  sendOtp,
  verifyUser,
  registerUser,
  loginUser,
  getUsers
} = require('../controllers/authController');

const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

// OTP flow
router.post('/send-otp', sendOtp);
router.post('/verify-user', verifyUser);

// Registration after verification
router.post('/register', registerUser);

// Login
router.post('/login', loginUser);

// Admin
router.get('/users', protect, admin, getUsers);

module.exports = router;