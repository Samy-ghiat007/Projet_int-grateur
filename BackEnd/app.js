const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./config/db.config');
const errorMiddleware = require('./middlewares/error.middleware');
const User = require('./models/user.model');
const Product = require('./models/product.model');
require('dotenv').config();

app.use(bodyParser.json());

// Import routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Error handling middleware
app.use(errorMiddleware.handleError);

// Sync database and insert default product data if needed
db.sync().then(async () => {
    console.log('Tables synchronized successfully.');

    // Check and insert default data for `products` table
    const products = await Product.findAll();
    if (products.length === 0) {
        await Product.bulkCreate([
            { make: 'HP', model: 'Steam', details: 'Notebook portable', price: 275.99, category: 'Laptop', image: 'images/product-1_1', quantity: 40 },
            { make: 'Lenovo', model: 'IdeaPad 1', details: 'Responsive performance in a slim chassis', price: 178.99, category: 'Laptop', image: 'images/product-2_1', quantity: 40 },
            { make: 'ASUS', model: 'Chromebook CX1400', details: 'Lightweight and ultraportable', price: 200.99, category: 'Laptop', image: 'images/product-3_1', quantity: 40 },
            { make: 'ROG', model: 'Ally', details: 'Portable gaming console', price: 899.99, category: 'Console', image: 'images/product-4_1', quantity: 40 },
            { make: 'Microsoft', model: 'Surface 7', details: 'Laptop', price: 707.99, category: 'Portable', image: 'images/product-5_1', quantity: 40 },
            { make: 'Dell', model: 'Wyse Z50D', details: 'Designed to deliver performance', price: 47.99, category: 'Desktop', image: 'images/product-6_1', quantity: 40 },
            { make: 'Apple', model: 'iMac', details: 'Good iMac Pro 27 inches', price: 279.99, category: 'Category 1', image: 'images/product-7_1', quantity: 40 },
            { make: 'HAJAAN', model: 'CYCLONIA', details: 'Gaming PC', price: 2029.99, category: 'Gaming PC', image: 'images/product-8_1', quantity: 40 },
            { make: 'Apple', model: 'Mac', details: 'From rich presentations to immersive games', price: 907.99, category: 'Desktop', image: 'images/product-9_1', quantity: 40 },
            { make: 'Apple', model: 'Mac M1', details: '24-inch 4K Retina Display', price: 1363.99, category: 'Desktop', image: 'images/product-10_1', quantity: 40 },
        ]);
        console.log('Product data inserted successfully.');
    }
}).catch((err) => {
    console.error('Error synchronizing tables:', err);
});



module.exports = app;
