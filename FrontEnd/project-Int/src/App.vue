<template>
  <div>
    <header>
      <v-toolbar class="d-flex justify-space-between">
        <v-spacer></v-spacer>

        <v-btn class="mx-auto" @click="router.push({ name: 'Catalog' })" color="primary" variant="elevated">
          Boutique
        </v-btn>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-btn class="mx-auto" @click="router.push({ name: 'LoginView' })" color="primary" variant="elevated">
          Se connecter
        </v-btn>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-btn @click="router.push({ name: 'CartView' })" color="primary" variant="elevated">
          Panier: {{ store.cart.length }}
        </v-btn>
        <v-spacer></v-spacer>
      </v-toolbar>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { productsStore } from "@/store/product";

const router = useRouter()
const store = productsStore()
</script>

<style scoped>
.cart-items {
  text-align: end;
  padding: 16px;
  font-weight: bold;
  font-size: 24px;
  cursor: pointer;
}
</style>