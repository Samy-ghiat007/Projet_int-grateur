//authentification du magasin
import { defineStore } from 'pinia'
import axios from 'axios'

const loginUrl = "http://localhost:5000/api/auth/login";
const registerUrl = "http://localhost:5000/api/auth/register";

export const useAuthentificationStore = defineStore('authentificationStore', {
    state:() => ({
        isAuthenticated: false,
        user: JSON.parse(localStorage.getItem('user'))
    }),

    getters:{
        getIsAuthenticated(state){
            return state.isAuthenticated;
        },

        getUser(state){
            return state.user;
        }
    },

    actions:{
        setUser(user){
            this.user = user;
        },

        setIsAuthenticated(boolean){
            this.isAuthenticated = boolean
        },

        logout(){
            this.setIsAuthenticated(false);
            this.setUser(null);
            localStorage.removeItem('user');
            //rediriger vers la page de login
        },

        async login(user){
          console.log(user)
            try {
                const response = await axios.post(loginUrl,{
                    username: user.username,
                    password: user.password
                });
                console.log(response);

                if(response.data.accessToken){
                    this.setIsAuthenticated(true);
                    this.setUser(response.data);
                    const accessToken = response.data.accessToken;
                    console.log(accessToken);
                    localStorage.setItem('user', JSON.stringify(accessToken));
                    console.log("user is connected")
                }

            } catch (error) {
                console.log(error);
                alert("Une erreur s'est produite. Veuillez réessayer...");
            }
        },

        async register(user){
          console.log(user)
            try {
                const response = await axios.post(registerUrl,{
                    name: user.name,
                    lastName: user.lastName,
                    email: user.email,
                    username: user.username,
                    password: user.password
                });
                console.log(response);

            } catch (error) {
                console.log(error);
                alert("Une erreur s'est produite. Veuillez réessayer...");
            }
        }
    }
})
