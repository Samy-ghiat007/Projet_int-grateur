//Pages du détail des produits
<template>
  <div>
    <v-btn
      @click="router.push({ name: 'Catalog' })"
      color="primary"
      variant="elevated"
    >
      Retour au catalogue
    </v-btn>

    <div class="product-container">
      <div class="product">
        <div class="product-details">
          <img :src="selectedProduct.image" alt="Image du produit" width="300" height="300" class="product-image">
          <p>Marque: {{ selectedProduct.make }}</p>
          <p>Details: {{ selectedProduct.details }}</p>
          <h2>Prix: {{ selectedProduct.price }}$</h2>
          <v-btn
            variant="elevated"
            color="indigo-lighten-3"
            @click="addToCart"
          >
            Ajouter au panier
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: 'ProductDetails'
});
</script>

<script setup>
import { computed } from "vue";
import { productsStore } from "@/store/product";
import { useRoute, useRouter } from "vue-router";

const store = productsStore();
const router = useRouter();
const route = useRoute();

const selectedProduct = computed(() => {
  return store.products.find((item) => item.id === Number(route.params.id));
});

const addToCart = () => {
  store.addToCart(selectedProduct.value);
  router.push({ name: 'CartView' });
};
</script>

<style scoped>
.product-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Pour centrer verticalement sur toute la hauteur de la vue */
}

.product {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product-details {
  text-align: center;
}

.product-image {
  margin-bottom: 24px;
}
</style>


