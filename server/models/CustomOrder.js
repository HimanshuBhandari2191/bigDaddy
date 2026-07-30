const mongoose = require('mongoose');

const customOrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  referenceImageUrl: { type: String, required: true },
  placement: { type: String, required: true }, // e.g. "Forearm", "Ankle"
  size: { type: String, required: true }, // e.g. "3 inch"
  notes: { type: String, default: '' },
  contactPhone: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'quoted', 'completed', 'declined'],
    default: 'pending'
  },
  quotedPrice: { type: Number },
  adminNote: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('CustomOrder', customOrderSchema);
