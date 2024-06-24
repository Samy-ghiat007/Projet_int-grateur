<template>
    <div class="profile-container">
      <h1>Bonjour, {{ user.prenom }}</h1>
      <div v-if="user">
        <div class="profile-item">
          <strong>Nom:</strong>
          <span v-if="!isEditing">{{ user.nom }}</span>
          <input v-else v-model="editedUser.nom" />
        </div>
        <div class="profile-item">
          <strong>Prénom:</strong>
          <span v-if="!isEditing">{{ user.prenom }}</span>
          <input v-else v-model="editedUser.prenom" />
        </div>
        <div class="profile-item">
          <strong>Courriel:</strong>
          <span v-if="!isEditing">{{ user.email }}</span>
          <input v-else v-model="editedUser.email" />
        </div>
        <div class="profile-item">
          <strong>Nom d'utilisateur:</strong>
          <span v-if="!isEditing">{{ user.username }}</span>
          <input v-else v-model="editedUser.username" />
        </div>
        <div class="profile-item">
          <strong>Mot de passe:</strong>
          <span v-if="!isEditing">{{ user.password }}</span>
          <input v-else v-model="editedUser.password" type="password" />
        </div>
        <div class="buttons">
          <v-btn v-if="!isEditing" @click="enableEditing" color="primary">Modifier</v-btn>
          <v-btn v-else @click="saveChanges" color="primary">Enregistrer</v-btn>
          <v-btn v-if="isEditing" @click="cancelEditing" color="secondary">Annuler</v-btn>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { useAuthentificationStore } from '@/store/authentificationStore';
  
  const authStore = useAuthentificationStore();
  
  const user = computed(() => authStore.user);
  const isEditing = ref(false);
  const editedUser = ref({ ...user.value });
  
  const enableEditing = () => {
    editedUser.value = { ...user.value };
    isEditing.value = true;
  };
  
  const saveChanges = async () => {
    await authStore.updateUser(editedUser.value);
    isEditing.value = false;
  };
  
  const cancelEditing = () => {
    isEditing.value = false;
  };
  </script>
  
  <style scoped>
  .profile-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }
  
  h1 {
    text-align: center;
    color: #333;
  }
  
  .profile-item {
    margin-bottom: 15px;
  }
  
  .profile-item strong {
    display: block;
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .buttons {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
  }
  </style>
  