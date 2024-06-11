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
        <v-btn
          class="mx-auto"
          @click="isAuthenticated ? handleLogout() : router.push({ name: 'LoginView' })"
          color="primary"
          variant="elevated"
        >
          {{ isAuthenticated ? 'Se déconnecter' : 'Se connecter' }}
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
import { useRouter } from 'vue-router';
import { productsStore } from '@/store/product';
import { useAuthentificationStore } from '@/store/authentificationStore';
import { computed } from 'vue';

const router = useRouter();
const store = productsStore();
const authStore = useAuthentificationStore();

const isAuthenticated = computed(() => authStore.getIsAuthenticated);

const handleLogout = () => {
  authStore.logout();
  router.push({ name: 'LoginView' });
};
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
