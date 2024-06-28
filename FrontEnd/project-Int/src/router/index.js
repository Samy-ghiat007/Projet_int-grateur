// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Catalog from "@/views/Catalog.vue";
import ProductDetail from "@/views/ProductDetail.vue";
import Cart from "@/views/Cart.vue";
import Login from '../components/Login.vue';
import Inscription from '../components/Inscription.vue';
import PayPal from '../views/PayPal.vue';
import Orders from '../components/Orders.vue'
import Profile from '@/views/Profile.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Catalog',
      component: Catalog
    },
    {
      path: '/product/:id',
      name: 'ProductView',
      component: ProductDetail
    },
    {
      path: '/cart',
      name: 'CartView',
      component: Cart
    },
    {
      path: '/login',
      name: 'LoginView',
      component: Login
    },
    {
      path: '/inscription',
      name: 'InscriptionView',
      component: Inscription
    },
    {
      path: '/paypal',
      name: 'PayPal',
      component: PayPal
    },
    {
      path:'/orders',
      name: 'Orders',
      component: Orders
    },
    {
      path: '/profile',
      name: 'ProfileView',
      component: Profile
    }
  ]
})

export default router
