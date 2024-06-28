### Progmatique : Application Web e-commerce (Vente de matériel informatique et électronique)

## Aperçu du Projet: 
 Il s'agit d'une application web de commerce électronique avec un frontend, un backend et une base de données. Elle utilise le framework Vue.js pour le frontend, le framework Express.js pour le backend avec Node.js, et la base de données MySQL. 

## Aperçu de l'Interface du Projet:
# Pour les Utilisateurs non Connectés
 Ce système de commerce électronique dispose de certains produits avec les informations nécessaires dans chaque catégorie. Vous pouvez également rechercher des produits avec des mots-clés. Ensuite, vous pouvez ajouter des produits à votre panier et passer à la caisse. Pour passer à la caisse avec votre produit dans le panier, vous devez fournir des informations de livraison et des informations de contact puis, vous devez payer la facture avec votre carte en utilisant la méthode de paiement Paypal, et votre commande sera passée. Un lien sera envoyé à votre courriel pour suivre le statut de votre commande avec les informations de contact et les produits que vous achetez. 

# Pour les Utilisateurs Connectés
 En plus des fonctionnalités ci-dessus. En vous connectant au système ou en vous inscrivant, vous pouvez utiliser votre compte pour enregistrer vos informations et vos adresses et préférences de paiement. Si vous oubliez votre mot de passe, vous pouvez réinitialiser votre mot de passe en envoyant un mail de vérification. Cette application web comprend également un profil utilisateur avec vos activités.

## Aperçu de la Programmation
# Description du Frontend
 Ce projet est implémenté en Vue.js (version 3). L'application web dispose de la gestion d'état avec plusieurs modules dans le répertoire store. Pour le frontend, il y a un processus d'authentification avec une fonctionnalité de réinitialisation du mot de passe qui inclut l'automatisation des emails. En utilisant la méthode de paiement de Paypal, l'application web peut traiter différents types de cartes et de devises supportées par Paypal. À partir des pages de routage, vous trouverez un code détaillé sur comment restreindre quelqu'un d'accéder à une route et afficher une page par défaut pour une demande non authentifiée ou une URL incorrecte entrée.

# Description du Backend 
 Les API RESTful et la gestion de l'authentification sont les deux parties importantes du backend. Le middleware de session et l'authentification JWT ont aidé à obtenir les données de la base de données en toute sécurité. La session de paiement est générée, et Sequelize ORM peut être utilisé pour travailler avec différents types de bases de données. Ce projet a travaillé avec la base de données MySQL ici. Les fichiers médias sont enregistrés et des URLs publiques sont générées. J'espère que vous trouverez ce projet utile. Si vous avez encore des questions, créez un problème ou posez-moi vos questions.

## Sujets inclus dans le projet
# Frontend
Vue.js
Vuetify 
Routage Vue
CSS 
Javascript
HTML
Pinia
# Backend
Node.js
Express.js
API RESTful
JWT Token + Bcrypt
Interface de base de données - Sequelize
Base de Données - MySQL

## Configuration du Projet
# Cloner le dépôt

 git clone: https://github.com/Samy-ghiat007/Projet_int-grateur.git

# Installation des dépendances du serveur

installez les dépendances du serveur depuis le répertoire 'Backend'

>cd backend && npm install

# Installation des dépendances de la boutique

>cd projet-int && npm install

# Démarrer le serveur backend

>cd backend && nodemon index.js

# Démarrer l'application frontend

>npm run dev

# Naviguer dans l'application

Votre application devrait fonctionner sur http://localhost:3000 et votre réseau privé.

Merci.