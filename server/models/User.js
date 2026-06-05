const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  verified: {
    type: Boolean,
    default: false,
  },
  otp: {
  type: String,
  },
  otpExpiry: {
  type: Date,
  },
  phone: {
    type: String
  },
  phoneVerified: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('User', UserSchema);