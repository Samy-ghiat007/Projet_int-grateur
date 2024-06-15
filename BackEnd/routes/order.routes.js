const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/create', authMiddleware.verifyToken, orderController.createOrder);
router.post('/capture/:orderId', authMiddleware.verifyToken, orderController.captureOrder);
router.get('/', authMiddleware.verifyToken, orderController.getOrders);

module.exports = router;
