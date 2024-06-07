// product.controller.js
const Product = require('../models/product.model');

// Create and save a new product
exports.create = async (req, res) => {
    try {
        const { make, model, details, price, category, image, quantity } = req.body;
        const newProduct = await Product.create({ make, model, details, price, category, image, quantity });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
};

// Retrieve all products
exports.findAll = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving products', error: error.message });
    }
};

// Retrieve a single product by ID
exports.findOne = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving product', error: error.message });
    }
};

// Update a product by ID
exports.update = async (req, res) => {
    try {
        const { make, model, details, price, category, image, quantity } = req.body;
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        product.make = make;
        product.model = model;
        product.details = details;
        product.price = price;
        product.category = category;
        product.image = image;
        product.quantity = quantity;
        await product.save();
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
};

// Delete a product by ID
exports.delete = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        await product.destroy();
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({message: 'Error deleting product', error: error.message});
    }
};

// Delete all products
exports.deleteAll = async (req, res) => {
    try {
        await Product.destroy({ where: {} });
        res.status(200).json({ message: 'All products deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting products', error: error.message });
    }
};

