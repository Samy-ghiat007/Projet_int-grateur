import { defineStore } from 'pinia';
//import { ref } from 'vue';
import axios from 'axios';

const loginUrl = 'http://localhost:5000/api/auth/login';
const registerUrl = 'http://localhost:5000/api/auth/register';

export const useAuthentificationStore = defineStore('authentificationStore', {
  state: () => ({
    isAuthenticated: !!localStorage.getItem('user'),
    user: JSON.parse(localStorage.getItem('user')),
  }),

  getters: {
    getIsAuthenticated(state) {
      return state.isAuthenticated;
    },

    getUser(state) {
      return state.user;
    },
  },

  actions: {
    setUser(user) {
      this.user = user;
    },

    setIsAuthenticated(boolean) {
      this.isAuthenticated = boolean;
    },

    logout() {
      this.setIsAuthenticated(false);
      this.setUser(null);
      localStorage.removeItem('user');
    },

    async login(user) {
      try {
        const response = await axios.post(loginUrl, {
          username: user.username,
          password: user.password,
        });

        if (response.data.accessToken) {
          this.setIsAuthenticated(true);
          this.setUser(response.data);
          localStorage.setItem('user', JSON.stringify(response.data.accessToken));
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
        return false;
      }
    },

    async register(user) {
      try {
        const response = await axios.post(registerUrl, {
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          username: user.username,
          password: user.password,
        });
        console.log(response);
      } catch (error) {
        console.log(error);
        alert("Une erreur s'est produite. Veuillez réessayer...");
      }
    },
  },
});
