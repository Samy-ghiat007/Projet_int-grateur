const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db.config');
require('dotenv').config();

app.use(bodyParser.json());
app.use(cors());

// Import routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');
const orderRoutes = require('./routes/order.routes');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes); 

// Error handling middleware
app.use(require('./middlewares/error.middleware').handleError);

// Sync database and insert default product data if needed
db.sync().then(async () => {
    console.log('Tables synchronized successfully.');

    // Check and insert default data for `products` table
    const products = await require('./models/product.model').findAll();
    if (products.length === 0) {
        await require('./models/product.model').bulkCreate([
    { make: 'HP', model: 'Steam', details: 'Notebook portable', price: 275.99, category: 'Laptop', image: 'https://iili.io/JpwEJ2V.jpg', quantity: 40 },
    { make: 'Lenovo', model: 'IdeaPad 1', details: 'Responsive performance in a slim chassis', price: 178.99, category: 'Laptop', image: 'https://iili.io/JpwE2kP.webp', quantity: 40 },
    { make: 'ASUS', model: 'Chromebook CX1400', details: 'Lightweight and ultraportable', price: 200.99, category: 'Laptop', image: 'https://iili.io/JpwEqQa.webp', quantity: 40 },
    { make: 'ROG', model: 'Ally', details: 'Portable gaming console', price: 899.99, category: 'Console', image: 'https://iili.io/JpwEIYN.webp', quantity: 40 },
    { make: 'Microsoft', model: 'Surface 7', details: 'Laptop', price: 707.99, category: 'Portable', image: 'https://iili.io/JpwE5jn.webp', quantity: 40 },
    { make: 'Dell', model: 'Wyse Z50D', details: 'Designed to deliver performance', price: 47.99, category: 'Desktop', image: 'https://iili.io/JpwEl44.webp', quantity: 40 },
    { make: 'Apple', model: 'iMac', details: 'Good iMac Pro 27 inches', price: 279.99, category: 'Category 1', image: 'https://iili.io/JpwEWu9.webp', quantity: 40 },
    { make: 'HAJAAN', model: 'CYCLONIA', details: 'Gaming PC', price: 2029.99, category: 'Gaming PC', image: 'https://iili.io/JpwEO6x.webp', quantity: 40 },
    { make: 'Apple', model: 'Mac', details: 'From rich presentations to immersive games', price: 907.99, category: 'Desktop', image: 'https://iili.io/JpwEgu1.webp', quantity: 40 },
    { make: 'Apple', model: 'Mac M1', details: '24-inch 4K Retina Display', price: 1363.99, category: 'Desktop', image: "https://iili.io/JpwG0og.webp", quantity: 40 },
        ]);
        console.log('Product data inserted successfully.');
    }
}).catch((err) => {
    console.error('Error synchronizing tables:', err);
});

module.exports = app;
