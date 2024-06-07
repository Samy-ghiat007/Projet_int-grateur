//Fetch des produits avec l'url
import { defineStore } from 'pinia'

export const productsStore = defineStore('products', {
  state: () => ({
    products: [],
      cart: []
  }),

  actions: {
        async fetchAllItems() {
          try {
            const response = await fetch("http://localhost:3000/product");
            if (!response.ok) {
              throw new Error('Erreur réseau');
            }
            const products = await response.json();
            this.products = products; 
          } catch (error) {
            console.error("Erreur lors de la récupération des produits:", error);
          }
        },
        addToCart(product) {
          this.cart.push(product)
        },
        removeFromCart(id) {
          console.log('>>>>> ID', id)
          this.cart = this.cart.filter((item) => item.id !== id)
    
        },

    
    }
  }
)