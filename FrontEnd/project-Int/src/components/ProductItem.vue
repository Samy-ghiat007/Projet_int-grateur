//Modélisation de la carte
<template>
  <v-sheet class="ma-2 pa-2">
    <v-card
        class="product"
    >
      <v-img
          :src="props.productData.image"
          height="200px"
          cover
      />
 
      <v-card-title>
        {{ props.productData.marque }}
      </v-card-title>
 
      <v-card-subtitle>
         {{ props.productData.modele }}
      </v-card-subtitle>
      <v-card-text>
        {{ props.productData.categorie }}
      </v-card-text>
      <v-card-text>
        {{ props.productData.details }}
      </v-card-text>
 
      <v-card-subtitle>
         {{ props.productData.prix }} $
      </v-card-subtitle>
 
      <v-card-actions>
        <v-btn class="custom-yellow" @click="goToProductPage(props.productData.id)">
          Ajouter au panier
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-sheet>
</template>
 
<script>
  import { defineComponent } from "vue";
  export default defineComponent({
    name: 'ProductItem',
  })
</script>
 
<script setup>
  import { defineProps, defineEmits } from 'vue'
  const props = defineProps({
    productData: {
      type: Object,
      required: true,
    }
  })
 
  const emit = defineEmits(['item-clicked'])
 
  const goToProductPage = (productId) => {
    emit('item-clicked', productId)
  }
</script>
 
<style>
.custom-yellow {
  background-color: #FFEB3B;
  color: black;
}
 
 
.custom-yellow:hover {
  background-color: #FDD835;
}
</style>