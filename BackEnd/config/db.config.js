const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        port: process.env.DB_PORT,
    }
);

sequelize.authenticate()
    .then(() => {
        console.log('Connexion à la base de données établie avec succès.');
    })
    .catch(err => {
        console.error('Impossible de se connecter à la base de données :', err);
    });

module.exports = sequelize;
