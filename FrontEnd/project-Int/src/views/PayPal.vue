<!-- Page PayPal -->
<script setup>
import { loadScript } from '@paypal/paypal-js'
import { onBeforeMount, ref } from 'vue'

// Change to your CLIENT ID gotten from the developer dashboard
const CLIENT_ID = 'AUND7T_D3FLYecFaEF5jpaxk5EDZFzjoa6Jd5rS-C1GAhJ2FHl4aWjZjTZ9-XQ0H4JRoOQYaCVkxOaWk'

// Props
const props = defineProps({
  cartTotal: {
    type: Number,
    default: 0.01,
  }
})

// State
const paid  = ref(false)

// Function to format price
const formatPrice = (price) => {
  return price.toFixed(2); // Format the price with two decimals
};

// Function to calculate taxes
const calculateTaxes = () => {
  // TPS (5%)
  const tps = props.cartTotal * 0.05;
  // TVQ (9.975%)
  const tvq = props.cartTotal * 0.09975;
  // Total taxes
  const totalTaxes = tps + tvq;
  return totalTaxes;
};

// Function to calculate total with taxes
const calculateTotalWithTaxes = () => {
  const totalTaxes = calculateTaxes();
  const totalWithTaxes = props.cartTotal + totalTaxes;
  return totalWithTaxes;
};

// onBeforeMount lifecycle hook
onBeforeMount(() => {
  loadScript({ 'client-id': CLIENT_ID }).then((paypal) => {
    paypal
      .Buttons({
        createOrder: createOrder,
        onApprove: onApprove,
      })
      .render('#paypal-button-container')
  })
})

// Create order function
function createOrder(data, actions) {
  console.log('Creating order...')
  return actions.order.create({
    purchase_units: [
      {
        amount: {
          value: formatPrice(calculateTotalWithTaxes()),
        },
      },
    ],
  })
}

// On approve function
function onApprove(data, actions) {
  console.log('Order approved...')
  return actions.order.capture().then(() => {
    paid.value = true
    console.log('Order complete!')
  })
}
</script>

<template>
    <div>
        <div>
            <!-- Display the total amount -->
            <p>Total: ${{ formatPrice(calculateTotalWithTaxes()) }}</p>
            <!-- Display the taxes -->
            <p>Taxes (TPS 5% + TVQ 9.975%): ${{ formatPrice(calculateTaxes()) }}</p>
        </div>

        <div v-if="!paid" id="paypal-button-container"></div>
        <div v-else id="confirmation">Order complete!</div>
    </div>
</template>

<style>
#paypal-button-container {
  width: 100%;
  margin: 30px 0;
}
</style>
