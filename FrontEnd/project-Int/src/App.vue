<template>
  <div>
    <header>
      <v-toolbar class="navbar">
        <div class="left-section">
          <img :src="logo" alt="Logo" class="logo" @click="router.push({ name: 'Home' })" />
        </div>

        <div class="center-section">
          <v-btn class="nav-btn" @click="router.push({ name: 'Catalog' })" color="primary" variant="elevated">
            Boutique
          </v-btn>
        </div>

        <div class="right-section">
          <v-btn
            class="nav-btn"
            @click="isAuthenticated ? handleLogout() : router.push({ name: 'LoginView' })"
            color="primary"
            variant="elevated"
          >
            {{ isAuthenticated ? 'Se déconnecter' : 'Se connecter' }}
          </v-btn>

          <v-btn class="nav-btn" @click="router.push({ name: 'CartView' })" color="primary" variant="elevated">
            Panier: {{ store.cart.length }}
          </v-btn>

          <template v-if="isAuthenticated">
            <v-btn class="nav-btn" @click="router.push({ name: 'Orders' })" color="primary" variant="elevated">
              Orders
            </v-btn>
          </template>
        </div>
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
import logo from "@/assets/logoProg.png"; // Use the correct logo path

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
.navbar {
  background-color: #3f51b5;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left-section {
  display: flex;
  align-items: center;
}

.center-section {
  display: flex;
  justify-content: center;
  flex-grow: 1;
  margin-left: 160px
}

.right-section {
  display: flex;
  align-items: center;
}

.logo {
  height: 40px;
  cursor: pointer;
}

.nav-btn {
  margin: 0 10px;
  color: white;
  font-weight: bold;
}

.v-btn {
  min-width: 120px;
}
</style>

