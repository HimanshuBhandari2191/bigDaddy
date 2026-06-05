const express = require('express');
const { protect} = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productsController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();
//all products
router.route('/').get(getProducts).post(protect, upload.single('image'), admin, createProduct);
//specific product
router.route('/:id').get(getProductById).put(protect, upload.single('image'), admin, updateProduct).delete(protect, admin, deleteProduct);



module.exports = router;