const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const {
  createOrder,
  verifyPayment,
  razorpayWebhook,
} = require("../controllers/paymentController");

const router = express.Router();

// payment order creation
router.post("/order", protect, createOrder);

// optional verify route
router.post("/verify", protect, verifyPayment);

// webhook (IMPORTANT: raw body)
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  razorpayWebhook
);

module.exports = router;