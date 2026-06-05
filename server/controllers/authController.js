const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sendEmail = require('../utils/sendEmail');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};



// ✅ 1. SEND OTP
const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    let user = await User.findOne({ email });

    // If user already fully registered
    if (user && user.password) {
      return res.status(400).json({ message: 'User already exists. Please login.' });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = Date.now() + 10 * 60 * 1000;

    if (!user) {
      // Create temp user
      user = await User.create({
        email,
        otp,
        otpExpiry,
        verified: false
      });
    } else {
      // Update OTP if already exists
      user.otp = otp;
      user.otpExpiry = otpExpiry;
      user.verified = false;
      await user.save();
    }

    const message = `
    <h2>Welcome to Big Daddy Tattoos!</h2>

    
    <p>Your OTP is: <strong>${otp}</strong></p>
    This OTP is valid for 10 minutes. Please do not share it with anyone.
    `;

    await sendEmail({
      email,
      subject: 'Big Daddy Tattoos - Your OTP Code',
      message
    });

    res.json({ message: 'OTP sent successfully' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ✅ 2. VERIFY OTP
const verifyUser = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: 'OTP expired. Request again.' });
    }

    if (user.otp !== otp.toString()) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    user.verified = true;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    res.json({ message: 'OTP verified successfully' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ✅ 3. REGISTER (SET NAME + PASSWORD)
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Please request OTP first' });
    }

    if (!user.verified) {
      return res.status(400).json({ message: 'Please verify OTP first' });
    }

    if (user.password) {
      return res.status(400).json({ message: 'User already registered' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.name = name;

    await user.save();

    res.json({ message: 'User registered successfully. Please login.' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ✅ 4. LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !user.password) {
      return res.status(400).json({ message: 'User not registered' });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ✅ 5. GET USERS (ADMIN)
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = {
  sendOtp,
  verifyUser,
  registerUser,
  loginUser,
  getUsers
};