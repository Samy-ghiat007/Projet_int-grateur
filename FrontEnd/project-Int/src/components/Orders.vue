<template>
  <div class="orders-container">
    <h1>Vos Commandes</h1>
    <ul>
      <li v-for="order in orders" :key="order.id"
          :class="{'successful': order.status === 'captured', 'failed': order.status !== 'captured'}">
        <p>ID de Commande: {{ order.id }}</p>
        <p>Statut: {{ order.status === 'captured' ? 'Réussi' : 'Échoué' }}</p>
        <p>Total: ${{ order.totalWithTaxes.toFixed(2) }}</p>
        <p>Date: {{ new Date(order.createdAt).toLocaleDateString() }}</p>
        <p>Heure: {{ new Date(order.createdAt).toLocaleTimeString() }}</p>
        <br/>
      </li>
    </ul>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import axios from 'axios';

const orders = ref([]);

onMounted(async () => {
  try {
    const token = localStorage.getItem('user'); // Ensure token is correctly formatted
    if (!token) {
      console.error('Token not found in local storage');
      return;
    }

    const response = await axios.get('http://localhost:5000/api/orders', {
      headers: {
        'x-access-token': token
      }
    });

    orders.value = response.data.orders;
    console.log('Fetched orders:', orders.value);
    console.log(response.data);
  } catch (error) {
    console.error('Failed to fetch orders:', error);
  }
});
</script>

<style>
.orders-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start; /* Align items to the left */
  padding: 0;
}

li {
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 20px;
  margin: 10px;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

li:hover {
  transform: translateY(-5px);
}

.successful {
  border-left: 5px solid green;
}

.failed {
  border-left: 5px solid red;
}

h1 {
  color: #333;
}
</style>
