<template>
  <v-btn class="passer-commande-btn" color="yellow" @click="passerCommande">Passer la commande</v-btn>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const passerCommande = () => {
  router.push({ name: 'PayPalView' });
};
</script>

<style scoped>
.passer-commande-btn {
  position: relative;
  top: 0px;
  left: 480px;
}
</style>
