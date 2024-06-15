const Order = require('../models/order.model');
const Product = require('../models/product.model');
const paypal = require('@paypal/checkout-server-sdk');

// Function to calculate total amounts
const calculateTotalAmounts = async (cartItems) => {
    let cartTotal = 0;

    for (const item of cartItems) {
        const product = await Product.findByPk(item.id);
        if (product) {
            cartTotal += product.price * item.quantity;
        }
    }

    const tax = cartTotal * 0.14975; // 14.975% total tax
    const totalWithTaxes = cartTotal + tax;

    return {cartTotal, tax, totalWithTaxes};
};

exports.createOrder = async (req, res) => {
    const {cartItems, paypalOrderId} = req.body;
    console.log('Cart Items:', cartItems);
    console.log('PayPal Order ID:', paypalOrderId);
    try {
        const {cartTotal, tax, totalWithTaxes} = await calculateTotalAmounts(cartItems);
        console.log('Calculating total amounts:', {cartTotal, tax, totalWithTaxes});

        // Reduce the quantity of each product in the database
        for (const item of cartItems) {
            const product = await Product.findByPk(item.id);
            if (product && product.quantity >= item.quantity) {
                product.quantity -= item.quantity; // Reduce the stock quantity
                await product.save();
                console.log('Reduced stock quantity for product ID:', item.id);
            } else {
                console.log('Insufficient stock for product ID:', item.id);
                return res.status(400).json({message: 'Insufficient stock for product ID: ' + item.id});
            }
        }

        const newOrder = await Order.create({
            userId: req.userId,
            cartTotal,
            tax,
            totalWithTaxes,
            status: 'created',
            paypalOrderId, // Store the PayPal order ID
            cartItems: JSON.stringify(cartItems), // Store cart items in the order
        });
        console.log('New order created:', newOrder);

        res.status(201).json(newOrder);
    } catch (error) {
        console.error('Failed to create order:', error.message);
        res.status(500).json({message: 'Failed to create order', error: error.message});
    }
};

exports.captureOrder = async (req, res) => {
    const {orderId} = req.params;

    const order = await Order.findByPk(orderId);
    if (!order) {
        console.log('Order not found');
        return res.status(404).json({message: 'Order not found'});
    }
    console.log('Order:', order);
    console.log('Order Status:', order.status);

    // Check if the order has already been captured
    if (order.status === 'captured') {
        console.log('Order already captured:', order);
        return res.status(400).json({message: 'Order already captured'});
    }

    try {
        // Set up PayPal environment
        let environment = new paypal.core.SandboxEnvironment('AY2JGjh5ofN9VsQPUd2if-BIbfgVbXnZlCBepqB4CFcY7KyGpdLyOLZIrYY3nGUKUhMhfMrlkFr4m-T7', 'EMQzsa-nmyLyUNI3mTd7JX71oGnZKmKPeTfAOByi3wPkxZ1erjJB5GCvVDcTJMSyulmjYVjvgkg6dIkb');
        let client = new paypal.core.PayPalHttpClient(environment);

        // Check PayPal order status before attempting to capture
        let getOrderRequest = new paypal.orders.OrdersGetRequest(order.paypalOrderId);
        let orderResponse = await client.execute(getOrderRequest);

        if (orderResponse.result.status === 'COMPLETED') {
            console.log('PayPal order already completed:', orderResponse.result);
            order.status = 'captured';
            await order.save();
            return res.status(200).json({message: 'Order already captured in PayPal', order});
        }

        // Capture the payment
        let captureRequest = new paypal.orders.OrdersCaptureRequest(order.paypalOrderId);
        captureRequest.requestBody({});
        let capture = await client.execute(captureRequest);

        console.log('PayPal capture response:', capture); // Log the capture response for debugging

        if (capture.statusCode === 201 || capture.result.status === 'COMPLETED') {
            order.status = 'captured';
            await order.save();
            console.log('Order captured successfully:', order);
            res.status(200).json({message: 'Order captured successfully', order});
        } else {
            await revertStockQuantities(order);
            console.log('Payment capture failed, stock quantities reverted');
            res.status(400).json({message: 'Payment capture failed, stock quantities reverted'});
        }
    } catch (error) {
        // Handle specific PayPal error for order already captured
        if (error.name === "UNPROCESSABLE_ENTITY" && error.details[0].issue === "ORDER_ALREADY_CAPTURED") {
            console.log('Order already captured error from PayPal:', error.message);
            res.status(400).json({message: 'Order already captured', error: error.message});
        } else {
            await revertStockQuantities(order); // Revert stock quantities on error
            console.error('Failed to capture order:', error.message);
            res.status(500).json({message: 'Failed to capture order', error: error.message});
        }
    }
};

// Function to revert stock quantities
async function revertStockQuantities(order) {
    const cartItems = JSON.parse(order.cartItems); // Parse cart items from the order
    for (const item of cartItems) {
        const product = await Product.findByPk(item.id);
        if (product) {
            product.quantity += item.quantity;
            await product.save();
        }
    }
}


// Function to revert stock quantities
async function revertStockQuantities(order) {
    const cartItems = JSON.parse(order.cartItems); // Parse cart items from the order
    for (const item of cartItems) {
        const product = await Product.findByPk(item.id);
        if (product) {
            product.quantity += item.quantity;
            await product.save();
        }
    }
}

exports.getOrders = async (req, res) => {
    try {
        const userId = req.userId; // Assuming userId is set by the auth middleware
        const orders = await Order.findAll({
            where: {userId: userId}
        });
        res.json({orders});
    } catch (error) {
        res.status(500).json({message: 'Failed to fetch orders', error: error.message});
    }
};
