//Fetch des produits avec l'url
import { defineStore } from 'pinia'

export const productsStore = defineStore('products', {
  state: () => ({
    products: [],
      cart: JSON.parse(localStorage.getItem('cart')) || []
  }),

  actions: {
        async fetchAllItems() {
          try {
            const response = await fetch("http://localhost:5000/api/products");
            // vous avez mit le mauvais url, c'est pas /products mais /api/products et pas 3000 mais 5000. - Mohamed Ali bachar
            if (!response.ok) {
              throw new Error('Erreur réseau');
            }
            const products = await response.json();
            this.products = products;
          } catch (error) {
            console.error("Erreur lors de la récupération des produits:", error);
          }
        },
        addToCart(product, quantity = 1) {
          const cartProduct = { ...product, quantity };
          this.cart.push(cartProduct);
          this.saveCart();
        },
        removeFromCart(id) {
          console.log('>>>>> ID', id)
          this.cart = this.cart.filter((item) => item.id !== id);
          this.saveCart();

        },
        saveCart() {
          localStorage.setItem('cart', JSON.stringify(this.cart));
        },
        loadCart() {
          const storedCart = localStorage.getItem('cart');
          if (storedCart) {
            this.cart = JSON.parse(storedCart);
          }



    }
  }
});
