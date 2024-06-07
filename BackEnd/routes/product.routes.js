// product.routes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

// Create a new product
router.post('/', productController.create);
// http://localhost:5000/api/products

// Retrieve all products
router.get('/', productController.findAll);
// http://localhost:5000/api/products or 5000

// Retrieve a single product by ID
router.get('/:id', productController.findOne);
// http://localhost:5000/api/products/1

// Update a product by ID
router.put('/:id', productController.update);
// http://localhost:5000/api/products/1

// Delete a product by ID
router.delete('/:id', productController.delete);
// http://localhost:5000/api/products/1

router.delete('/', productController.deleteAll);

module.exports = router;
