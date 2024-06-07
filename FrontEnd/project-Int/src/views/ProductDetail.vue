//Pages du détail des produits
<template>

  <v-btn
      @click="router.push({ name: 'Catalog' })"
      color="primary"
      variant="elevated">
    Retour au catalogue
  </v-btn>

  <div class="product">
    <!-- <div class="product-image">
      <img :src="selectedProduct.image" alt="selectedProduct.modele">
    </div> -->
    <div class="product-details">
      <p>Marque: {{ selectedProduct.marque }}</p>
      <p>Details: {{ selectedProduct.details }}</p>
      <h2>Prix: {{ selectedProduct.prix }}$</h2>
      <v-btn
          variant="elevated"
          color="indigo-lighten-3"
          @click="addToCart"
      >Ajouter au panier</v-btn>
    </div>
  </div>
</template>


<script>
  import { defineComponent } from "vue";
  export default defineComponent({
    name: 'ProductDetails'
  })
</script>

<script setup>
  import { computed } from "vue";
  import { productsStore } from "@/store/product";
  //vous avez mal importe productsStore en le cherchant dans @/stores/products alors que le fichier n'existe pas. Il faut le chercher dans @/store/product - Mohamed Ali bachar
  import { useRoute, useRouter } from "vue-router";

  const store = productsStore()
  const router = useRouter()
  const route = useRoute()



  const selectedProduct = computed(() => {
    return store.products.find((item) => item.id === Number(route.params.id))
  })

  const addToCart = () => {
    store.addToCart(selectedProduct.value)
    router.push({ name: 'CartView' })
  }
</script>

<style scoped>
.product {
  display: flex;
  margin-top: 50px;
}

.product-image {
  margin-right: 24px;
}

</style>
