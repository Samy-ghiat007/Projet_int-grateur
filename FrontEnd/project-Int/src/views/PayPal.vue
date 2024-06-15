<script setup>
import { loadScript } from '@paypal/paypal-js';
import { ref, onMounted } from 'vue';
import axios from 'axios';

// PayPal Client ID
const CLIENT_ID = 'AY2JGjh5ofN9VsQPUd2if-BIbfgVbXnZlCBepqB4CFcY7KyGpdLyOLZIrYY3nGUKUhMhfMrlkFr4m-T7';

// State
const paid = ref(false);
const orderId = ref(null);
const cartItems = ref([]);

// Constants for tax rates
const TPS_RATE = 0.05;
const TVQ_RATE = 0.09975;

// Function to format price
const formatPrice = (price) => {
  if (price === null || price === undefined) {
    return '0.00'; // Default to '0.00' if price is null or undefined
  }
  const numericPrice = Number(price);
  return numericPrice.toFixed(2);
};

// Get cart items from localStorage
const loadCartItems = () => {
  try {
    const cart = localStorage.getItem('cart');
    if (cart) {
      cartItems.value = JSON.parse(cart).map(item => ({
        ...item,
        price: parseFloat(item.price) // Ensure price is a number
      }));
      console.log('Cart items loaded:', cartItems.value); // Debug log
    } else {
      console.error('Cart is empty or not found in localStorage.');
    }
  } catch (error) {
    console.error('Failed to parse cart items from localStorage:', error);
  }
};

// Variables for calculating subtotal, taxes, and total with taxes
let subtotal = ref(0);
let tax = ref(0);
let totalWithTaxes = ref(0);

const calculateTotals = () => {
  console.log("Cart Items:", cartItems.value);
  subtotal.value = cartItems.value.reduce((acc, item) => {
    console.log("Processing item:", item);
    const itemPrice = Number(item.price) || 0;
    const itemQuantity = Number(item.quantity) || 0;
    console.log("Price:", itemPrice, "Quantity:", itemQuantity);
    return acc + itemPrice * itemQuantity;
  }, 0);
  console.log("Subtotal:", subtotal.value);
  tax.value = subtotal.value * (TPS_RATE + TVQ_RATE);
  console.log("Tax:", tax.value);
  totalWithTaxes.value = subtotal.value + tax.value;
  console.log("Total with Taxes:", totalWithTaxes.value);
};

// Create order on the backend
const createOrderOnBackend = async (paypalOrderId) => {
  console.log('Creating order on backend with PayPal order ID:', paypalOrderId);
  try {
    const token = localStorage.getItem('user').replace(/"/g, '');
    const response = await axios.post('http://localhost:5000/api/orders/create', {
      cartItems: cartItems.value,
      paypalOrderId // Ensure this is correctly passed and used in the backend
    }, {
      headers: {
        'x-access-token': token
      }
    });
    orderId.value = response.data.id;
    console.log('Order created on backend:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to create order:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Capture order on the backend
const captureOrderOnBackend = async () => {
  try {
    console.log('Capturing order on backend');
    const token = localStorage.getItem('user').replace(/"/g, '');
    const response = await axios.post(`http://localhost:5000/api/orders/capture/${orderId.value}`, {}, {
      headers: {
        'x-access-token': token
      }
    });
    if (response.data.order.status === 'captured') {
      paid.value = true;
      console.log('Order captured on backend');
    } else {
      console.error('Order not captured, status:', response.data.order.status);
    }
  } catch (error) {
    console.error('Failed to capture order:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to handle post-transaction actions
const handleTransactionComplete = () => {
  alert('Transaction completed successfully!');
  localStorage.removeItem('cart'); // Clear the cart
  cartItems.value = []; // Clear the cart items in the state

  // Use traditional window.location to force a full page reload
  window.location.href = '/orders';
};

// Function to render PayPal button
const renderPayPalButton = (paypal) => {
  try {
    paypal.Buttons({
      createOrder: async (data, actions) => {
        try {
          const order = await actions.order.create({
            purchase_units: [{
              amount: {
                currency_code: 'USD',
                value: formatPrice(totalWithTaxes.value)
              }
            }],
            application_context: {
              brand_name: 'Progmatique',
              user_action: 'PAY_NOW',
            },
          });
          console.log('Created PayPal order:', order);
          const backendOrder = await createOrderOnBackend(order); // Call createOrderOnBackend here
          return order; // Return the PayPal order ID to PayPal
        } catch (error) {
          console.error('Error creating PayPal order:', error);
          throw error; // Rethrow or handle as needed
        }
      },
      onApprove: async (data, actions) => {
        await actions.order.capture();
        await captureOrderOnBackend();
        handleTransactionComplete(); // Call the function after transaction is approved
      },
      onError: (err) => {
        console.error('Error during PayPal button render:', err);
      }
    }).render('#paypal-button-container');
  } catch (error) {
    console.error('Failed to render PayPal button:', error);
  }
};

// onMounted lifecycle hook to ensure DOM is ready
onMounted(async () => {
  loadCartItems();
  calculateTotals();
  try {
    const paypal = await loadScript({'client-id': CLIENT_ID});
    const paypalContainer = document.querySelector('#paypal-button-container');
    if (paypalContainer) {
      renderPayPalButton(paypal);
    } else {
      console.error('#paypal-button-container element not found');
    }
  } catch (error) {
    console.error('PayPal script failed to load:', error);
  }
});
</script>

<template>
  <div>
    <div v-if="cartItems.length">
      <h2>Your Cart</h2>
      <ul>
        <li v-for="item in cartItems" :key="item.id" class="cart-item">
          <div class="item-details">
            <h3>{{ item.name }}</h3>
            <p><strong>Category:</strong> {{ item.category }}</p>
            <p><strong>Price:</strong> ${{ formatPrice(item.price) }}</p>
            <p><strong>Quantity:</strong> {{ item.quantity }}</p>
            <p><strong>Total:</strong> ${{ formatPrice(item.price * item.quantity) }}</p>
          </div>
          <img :src="item.image" alt="Item Image" class="item-image-small"/>
        </li>
      </ul>
      <div class="totals">
        <p><strong>Subtotal:</strong> ${{ formatPrice(subtotal) }}</p>
        <p><strong>Taxes:</strong> ${{ formatPrice(tax) }}</p>
        <p><strong>Total:</strong> ${{ formatPrice(totalWithTaxes) }}</p>
      </div>
      <div id="confirmation" v-if="paid">Order complete!</div>
    </div>
    <div v-else>
      <p>Your cart is empty.</p>
    </div>
  </div>
  <div id="paypal-button-container"></div>
</template>

<style>
#paypal-button-container {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  width: 100% !important;
  margin: 30px 0;
}

#paypal-button-container > div { /* Assuming PayPal button is wrapped in a div */
  width: 100%; /* Adjust this as necessary */
  display: flex;
  justify-content: center;
}

h2, h3 {
  margin-bottom: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
}

.cart-item {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  align-items: center;
}

.item-details {
  flex: 1;
  margin-right: 20px;
}

.item-details p {
  margin: 5px 0;
}

.item-image-small {
  width: 100px;
  height: auto;
  border-radius: 5px;
}

.totals p {
  margin: 10px 0;
  font-size: 1.1em;
  font-weight: bold;
}

strong {
  font-weight: bold;
}
</style>
