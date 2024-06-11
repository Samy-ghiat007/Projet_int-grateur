<!-- eslint-disable vue/multi-word-component-names -->

<template>
    <div>
        <button @click="router.push({ name: 'Catalog' })">Retour au catalogue</button>
        <div v-if="!store.cart.length" style="text-align: center">
            <h1>Panier vide ...</h1>
        </div>
        <div class="cart-items" v-else>
            <div class="cart-item" v-for="item in store.cart" :key="item.id">
                <div class="item-details">
                    <img :src="item.image" alt="item.modele">
                    <span>Marque: {{ item.make }}</span>
                    <span>Categorie: {{ item.category }}</span>
                    <span>Prix: {{ item.price }}$</span>
                    <button @click="removeFromCart(item.id)">Supprimer</button>
                </div>
            </div>
            <div class="total">
                Montant total: {{ calculateTotal() }}$
            </div>
            <div>
                <PasserCommandeButton />
            </div>
            <div>
                <!-- Passer le montant total à PayPal.vue -->
                <PayPal :cartTotal="calculateTotal()" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from "vue-router";
import { productsStore } from "@/store/product";
import PasserCommandeButton from '@/components/PasserCommandeButton.vue';



const router = useRouter();
const store = productsStore();

const removeFromCart = (id) => {
    store.removeFromCart(id);
};

const calculateTotal = () => {
  let total = store.cart.reduce((acc, item) => acc + Number(item.price), 0);
  return parseFloat(total.toFixed(2));
};

onMounted(() => {
  store.loadCart();
});


</script>

<style scoped>
.item-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
    box-shadow: 0 0 17px 6px #e7e7e7;
    border-radius: 8px;
    padding: 16px;
}

.item-details img {
    width: 20%;
}
</style>
