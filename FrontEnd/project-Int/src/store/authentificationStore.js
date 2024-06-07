//authentification du magasin
import { defineStore } from 'pinia'
import axios from 'axios'
 
const loginUrl = "http://localhost:5000/login";
 
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
            try {
                const response = await axios.post(loginUrl,{
                    username: user.username,
                    motdepass: user.password
                });
                console.log(response);
 
                if(response.status === '200'){
                    this.setIsAuthenticated(true);
                    this.setUser(response.data);
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
               
            } catch (error) {
                console.log(error);
                alert("Une erreur s'est produite. Veuillez réessayer...");
            }
        }
    }
})