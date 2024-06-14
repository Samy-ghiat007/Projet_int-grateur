<template>
    <div>
      <button @click="router.push({ name: 'Catalog' })">Retour au catalogue</button>
      <div v-if="!cartItems.length" style="text-align: center">
        <h1>Panier vide ...</h1>
      </div>
      <div class="cart-items" v-else>
        <div class="cart-item" v-for="item in cartItems" :key="item.id">
          <div class="item-details">
            <img :src="item.image" alt="item.modele">
            <span>Marque: {{ item.make }}</span>
            <span>Categorie: {{ item.category }}</span>
            <span>Prix: {{ item.price }}$</span>
            <span>Quantité: {{ item.quantity }}</span>
            <button @click="removeFromCart(item.id)">Supprimer</button>
          </div>
        </div>
        <div class="total">
          Montant total: {{ calculateTotal() }}$
        </div>
        <div>
          <PasserCommandeButton />
        </div>
        <div>
          <!-- Navigate to PayPal page -->
          <button @click="navigateToPayPal">Payer avec PayPal</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import { useRouter } from "vue-router";
  import PasserCommandeButton from '@/components/PasserCommandeButton.vue';
  
  const router = useRouter();
  const cartItems = ref([]);
  
  const loadCart = () => {
    const cart = localStorage.getItem('cart');
    if (cart) {
      cartItems.value = JSON.parse(cart);
    }
  };
  
  const removeFromCart = (id) => {
    cartItems.value = cartItems.value.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cartItems.value));
  };
  
  const calculateTotal = () => {
    return cartItems.value.reduce((acc, item) => acc + (Number(item.price) * item.quantity), 0).toFixed(2);
  };
  
  const navigateToPayPal = () => {
    router.push({ name: 'PayPal' });
  };
  
  onMounted(() => {
    loadCart();
  });
  </script>
  
  <style scoped>
  .item-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
    box-shadow: 0 0 17px 6px #e7e7e7;
    border-radius: 8px;
    padding: 16px;
  }
  
  .item-details img {
    width: 20%;
  }
  </style>
  