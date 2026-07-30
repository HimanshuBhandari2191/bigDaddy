const CustomOrder = require('../models/CustomOrder');
const cloudinary = require('../config/cloudinary');
const sendEmail = require('../utils/sendEmail');

// Create a new custom tattoo request (user uploads a reference image)
const createCustomOrder = async (req, res) => {
  try {
    const { placement, size, notes, contactPhone } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a reference image' });
    }
    if (!placement || !size || !contactPhone) {
      return res.status(400).json({ message: 'Placement, size, and contact phone are required' });
    }

    const result = await cloudinary.uploader.upload(req.file.path);

    const customOrder = new CustomOrder({
      userId: req.user._id,
      referenceImageUrl: result.secure_url,
      placement,
      size,
      notes: notes || '',
      contactPhone
    });

    const created = await customOrder.save();

    try {
      await sendEmail({
        email: req.user.email,
        subject: 'Custom Tattoo Request Received - Big Daddy Tattoos',
        message: `
          <h2>We got your custom tattoo request!</h2>
          <p>Hi ${req.user.name},</p>
          <p>Our team will review your design and get back to you with a quote shortly.</p>
          <p>Placement: ${placement}</p>
          <p>Size: ${size}</p>
        `
      });
    } catch (emailErr) {
      // Don't fail the request just because the confirmation email failed
      console.error('Custom order confirmation email failed:', emailErr.message);
    }

    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Logged-in user's own custom requests
const getMyCustomOrders = async (req, res) => {
  try {
    const orders = await CustomOrder.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: all custom requests
const getCustomOrders = async (req, res) => {
  try {
    const orders = await CustomOrder.find({}).populate('userId', 'name email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: update status / quoted price / note
const updateCustomOrderStatus = async (req, res) => {
  try {
    const order = await CustomOrder.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Custom order not found' });
    }
    order.status = req.body.status || order.status;
    if (req.body.quotedPrice !== undefined) order.quotedPrice = req.body.quotedPrice;
    if (req.body.adminNote !== undefined) order.adminNote = req.body.adminNote;

    const updated = await order.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createCustomOrder, getMyCustomOrders, getCustomOrders, updateCustomOrderStatus };
