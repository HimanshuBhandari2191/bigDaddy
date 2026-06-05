const Order = require('../models/Order');
const sendEmail = require('../utils/sendEmail');
const Product = require('../models/Product');

const addOrderItems = async (req, res) => {
  try {
    const { items, totalAmount, address, paymentId } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    // 🔥 STEP 1: CHECK & REDUCE STOCK
    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (product.stock < item.qty) {
        return res.status(400).json({
          message: `${product.name} is out of stock`
        });
      }

      product.stock -= item.qty;
      await product.save();
    }

    // 🔥 STEP 2: CREATE ORDER
    const order = new Order({
      userId: req.user._id,
      items,
      totalAmount,
      address,
      paymentId
    });

    const createdOrder = await order.save();

    // 🔥 STEP 3: EMAIL
    const message = `
      <h2>Order Confirmation</h2>
      <p>Hello ${req.user.name},</p>
      <p>Your order ID: <strong>${createdOrder._id}</strong></p>
      <p>Total Amount: ₹${totalAmount}</p>
      <p>Shipping to: ${address.street}, ${address.city}</p>
      <p>Thank you for shopping with ShopNest!</p>
    `;

    await sendEmail({
      email: req.user.email,
      subject: 'Order Confirmation',
      message
    });

    res.status(201).json(createdOrder);

  } catch (error) {
    console.error("ORDER ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('userId', 'id name');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.status = req.body.status || order.status;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addOrderItems, getMyOrders, getOrders, updateOrderStatus };