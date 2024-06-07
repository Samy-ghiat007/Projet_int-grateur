<template>
  <v-card @click="itemClicked" class="mx-auto my-4 card-style" max-width="344">
    <v-img :src="productData.image" height="200px" class="card-image"></v-img>
    <v-card-title class="text-h6">{{ productData.make }} - {{ productData.model }}</v-card-title>
    <v-card-subtitle>{{ productData.details }}</v-card-subtitle>
    <v-card-text>
      <div class="category">Category: {{ productData.category }}</div>
      <div class="price">Price: ${{ productData.price }}</div>
      <div class="quantity">Quantity: {{ productData.quantity }}</div>
    </v-card-text>
    <v-card-actions>
      <v-btn text="View Details" color="primary" @click.stop="itemClicked"></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'ProductItem',
  props: {
    productData: {
      type: Object,
      required: true
    }
  },
  methods: {
    itemClicked() {
      this.$emit('item-clicked', this.productData.id);
    }
  }
}
</script>

<style scoped>
.card-style {
  background-color: #f5f5f5; /* Light gray background */
  border: 1px solid #646464;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.card-style:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.card-image {
  object-fit: cover;
  width: 100%;
  height: 200px;
  border-bottom: 1px solid #e0e0e0;
}

.v-card-title, .v-card-subtitle {
  color: #333;
}

.v-card-text {
  font-size: 14px;
  color: #555;
}

.category {
  color: #1976D2;
  font-weight: bold;
}

.price {
  color: #4CAF50;
  font-weight: bold;
}

.quantity {
  color: #FFC107;
  font-weight: bold;
}
</style>
