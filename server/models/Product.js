const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String, required: true
    },
    description: {
        type: String, required: true
    },
    price: {
        type: Number, required: true
    },
    size: {
        type: Number, required: true
    },
    stock: {
        type: Number, required: true
    },
    imageUrl: {
        type: String, required: true
    },
    category: {
        type: String,
        enum: ['animal', 'spiritual', 'aquatic', 'nature', 'anime', 'tribal', 'armband', 'other'],
        default: 'other'
    },
    originalPrice: {
        // Optional "was" price. If set and greater than price, the product shows a strikethrough discount.
        type: Number
    },
    badge: {
        // Free-text promo badge, e.g. "NEW", "B1G1", "SALE"
        type: String,
        default: ''
    },
    createdAt: {
        type: Date, default: Date.now
    },
    rating: {
        type: Number, default: 0
    },
    numReviews: {
        type: Number, default: 0
    }

});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;