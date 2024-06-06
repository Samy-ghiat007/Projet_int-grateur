// product.routes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

// Create a new product
router.post('/', productController.create);

// Retrieve all products
router.get('/', productController.findAll);

// Retrieve a single product by ID
router.get('/:id', productController.findOne);

// Update a product by ID
router.put('/:id', productController.update);

// Delete a product by ID
router.delete('/:id', productController.delete);

module.exports = router;
