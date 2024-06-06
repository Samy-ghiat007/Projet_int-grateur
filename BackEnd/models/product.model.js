const { DataTypes } = require('sequelize');
const db = require('../config/db.config');

const Product = db.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    make: {
        type: DataTypes.STRING,
        allowNull: true
    },
    model: {
        type: DataTypes.STRING,
        allowNull: true
    },
    details: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),  // Changed from FLOAT to DECIMAL
        allowNull: true
    },
    category: {
        type: DataTypes.STRING,
        allowNull: true
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
});

module.exports = Product;
