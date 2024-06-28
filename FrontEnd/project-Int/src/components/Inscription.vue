<template>
    <div>
      <form @submit.prevent="signUp">
        <div class="containerI">

          <label for="new-uname"><b>Nom</b></label>
          <input type="text" name="new-uname" required v-model="newUser.lastName">
          <br>
          <label for="new-uname"><b>Prénom</b></label>
          <input type="text" name="new-uname" required v-model="newUser.name">
          <br>
          <label for="e-mail"><b>Courriel</b></label>
          <input type="text" name="email" required v-model="newUser.email">
          <br>
          <label for="new-uname"><b>Nom d'utilisateur</b></label>
          <input type="text" name="new-uname" required v-model="newUser.username">
          <br>
          <label for="new-psw"><b>Mot de passe</b></label>
          <input type="password" name="new-psw" required v-model="newUser.password">
          <br>
          <label for="confirm-psw"><b>Confirmer le mot de passe</b></label>
          <input type="password" name="confirm-psw" required v-model="newUser.confirmPassword">

          <v-btn type="submit" color="primary">S'inscrire</v-btn>
        </div>
      </form>
      <div class="containerI">
        <router-link to="/login">Déjà inscrit ? Connectez-vous</router-link>
      </div>
    </div>
  </template>

  <script setup>
  import { reactive } from 'vue';
  import { useAuthentificationStore } from '@/store/authentificationStore';
  import router from "@/router";

  const authentificationStore = useAuthentificationStore();
  const newUser = reactive({ username: '', password: '', email: '', nom: '', prenom: '', confirmPassword: '' });

  async function signUp() {
    if (newUser.password !== newUser.confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }
    await authentificationStore.register(newUser);
    await router.push('/login');
  }
  </script>

  <style>
  .containerI {
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
