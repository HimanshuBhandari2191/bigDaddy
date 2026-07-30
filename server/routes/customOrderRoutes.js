const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const {
  createCustomOrder,
  getMyCustomOrders,
  getCustomOrders,
  updateCustomOrderStatus
} = require('../controllers/customOrderController');

const router = express.Router();

router.route('/')
  .post(protect, upload.single('image'), createCustomOrder)
  .get(protect, admin, getCustomOrders);

router.route('/mine').get(protect, getMyCustomOrders);
router.route('/:id/status').put(protect, admin, updateCustomOrderStatus);

module.exports = router;
