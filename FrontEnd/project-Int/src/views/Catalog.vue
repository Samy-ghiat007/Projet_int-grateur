<template>
  <div class="products-list">
    <v-text-field v-model="search" label="Magasinez vos produits" prepend-icon="mdi-magnify"></v-text-field>

    <v-row dense>
      <v-col
        v-for="product in filteredProducts"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <product-item
          :product-data="product"
          @item-clicked="goToProductPage"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { defineComponent, computed, ref, onMounted } from 'vue';
import ProductItem from '@/components/ProductItem.vue';
import { productsStore } from '@/store/product';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'CatalogView',
  components: {
    ProductItem
  },
  setup() {
    const store = productsStore();
    const router = useRouter();
    const search = ref('');

    const goToProductPage = (id) => {
      router.push({ name: 'ProductView', params: { id } });
    };

    const filteredProducts = computed(() => {
      return store.products.filter(product =>
        product.make.toLowerCase().includes(search.value.toLowerCase()) ||
        product.model.toLowerCase().includes(search.value.toLowerCase()) ||
        product.details.toLowerCase().includes(search.value.toLowerCase()) ||
        product.category.toLowerCase().includes(search.value.toLowerCase())
      );
    });

    onMounted(async () => {
      try {
        await store.fetchAllItems();
      } catch (error) {
        console.error('Erreur lors du montage de Catalog.vue:', error);
      }
    });

    return {
      search,
      goToProductPage,
      filteredProducts,
      store
    };
  }
});
</script>

<style scoped>
.products-list {
  padding: 20px;
}
</style>
