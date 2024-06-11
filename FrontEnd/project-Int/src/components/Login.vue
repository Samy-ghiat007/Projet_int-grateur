<script setup>

import { reactive } from 'vue';
import {useAuthentificationStore} from '@/store/authentificationStore';
import router from "@/router";

const authentificationStore = useAuthentificationStore();
const user = reactive({username: '', password: ''})

async function signIn(){
    await authentificationStore.login(user)
    await router.push('/');
}

</script>

 // Formulaire de login
<template>
    <div>
        <form>
            <div class="container">
                <label for="uname"><b>Nom d'utilisateur</b></label>
                <input type="text" name="uname" required v-model="user.username">
                <br>
                <label for="psw"><b>Mot de passe</b></label>
                <input type="password" name="psw" required v-model="user.password">


                <v-btn @click="signIn" color="primary">
                    Se connecter
                </v-btn>

                <label>
                    <input type="checkbox" checked="checked" name="remember"> Se souvenir de moi
                </label>
            </div>
        </form>
        <div class="container">
            <router-link to="/inscription">Pas encore inscrit ? Créez un compte</router-link>
        </div>
    </div>
</template>

//Style de la page
<style>
    .container {
            display: flex;
            flex-direction: column;
            width: 100%;
            max-width: 400px;
            margin: 0 auto;
            padding: 20px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            background-color: #ffffff;
}

label {
            margin-bottom: 8px;
            font-weight: bold;
            color: #333;
}

        input[type="text"],
        input[type="password"] {
        font-size: 16px;
        padding: 10px;
        margin-bottom: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        outline: none;
}

        input[type="text"]:focus,
        input[type="password"]:focus {
        border-color: #007bff;
}

.v-btn {
        cursor: pointer;
        text-align: center;
        margin: 10px 0;
}

label > input[type="checkbox"] {
  margin-right: 10px;
}


        label {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        }

</style>
