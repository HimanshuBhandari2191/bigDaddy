const crypto = require("crypto");
const razorpay = require("../config/razorpay");
const Order = require("../models/Order");
const Product = require("../models/Product");

// ✅ Create Razorpay Order
const createOrder = async (req, res) => {
  try {
    const { amount, items, address } = req.body;
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,

      // 🔥 IMPORTANT: send metadata to webhook
      notes: {
        userId: req.user._id.toString(),
        items: JSON.stringify(items),
        address: JSON.stringify(address),
      },
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// (Optional fallback - not used in webhook flow)
const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (expectedSign === razorpay_signature) {
      return res.json({ success: true });
    } else {
      return res.status(400).json({ success: false });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔥 WEBHOOK (MAIN LOGIC)
const razorpayWebhook = async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(req.body);
    const digest = shasum.digest("hex");

    const signature = req.headers["x-razorpay-signature"];

    if (digest !== signature) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    const event = JSON.parse(req.body);

    // Only payment success
    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity;

      const items = JSON.parse(payment.notes.items);
      const address = JSON.parse(payment.notes.address);

      // 🔥 Reduce Stock
      for (const item of items) {
        const product = await Product.findById(item.productId);

        if (product) {
          product.stock -= item.qty;
          await product.save();
        }
      }

      // 🔥 Create Order
      await Order.create({
        userId: payment.notes.userId,
        items,
        totalAmount: payment.amount / 100,
        address,
        paymentId: payment.id,
        status: "Paid",
      });
    }

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  verifyPayment,
  razorpayWebhook,
};