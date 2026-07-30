const Product = require('../models/Product');
const cloudinary = require('../config/cloudinary');

//get all products (optionally filtered by ?category=)
const getProducts = async (req, res) => {
    try {
        const filter = {};
        if (req.query.category && req.query.category !== 'all') {
            filter.category = req.query.category;
        }
        const products = await Product.find(filter);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//get product by id

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//create product

const createProduct = async (req, res) => {
    try {
        const { name, description, price, size, stock, category, originalPrice, badge } = req.body;

        let imageUrl = '';
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            imageUrl = result.secure_url;
        }
        const product = new Product({
            name, description, price, size, stock, imageUrl,
            category: category || 'other',
            originalPrice: originalPrice || undefined,
            badge: badge || ''
        });

        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });   
    }
};

//update product

const updateProduct = async (req, res) => {
    try {
        const { name, description, price, size, stock, category, originalPrice, badge } = req.body;
        
        const product = await Product.findById(req.params.id);
        if(product) {
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price || product.price;
            product.size = size || product.size;
            product.stock = stock || product.stock;
            product.category = category || product.category;
            // originalPrice/badge can be intentionally cleared, so accept empty string/0 as "clear"
            if (originalPrice !== undefined) product.originalPrice = originalPrice === '' ? undefined : originalPrice;
            if (badge !== undefined) product.badge = badge;
            if (req.file) {
                const result = await cloudinary.uploader.upload(req.file.path);
                console.log('Cloudinary upload result:', result);
                product.imageUrl = result.secure_url;
            }
            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//delete product

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        
        if (product) {
            await product.deleteOne();
            res.json({ message: 'Product deleted' });
        }
        else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };