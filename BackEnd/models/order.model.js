const {DataTypes} = require('sequelize');
const db = require('../config/db.config');

const Order = db.define('Order', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cartTotal: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    tax: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    totalWithTaxes: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending',
    },
    paypalOrderId: { // New field to store PayPal order ID
        type: DataTypes.STRING,
        allowNull: false,
    },
    cartItems: { // New field to store cart items
        type: DataTypes.JSON,
        allowNull: false,
    }
});

module.exports = Order;
