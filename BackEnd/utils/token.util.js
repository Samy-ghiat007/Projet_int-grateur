// Utilitaire pour gérer les tokens
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.config');

exports.generateToken = (userId) => {
    return jwt.sign({ id: userId }, authConfig.secret, {
        expiresIn: 86400 // 24 heures
    });
};
