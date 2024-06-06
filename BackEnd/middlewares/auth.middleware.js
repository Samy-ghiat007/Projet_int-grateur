// Middleware pour vérifier le token d'authentification
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.config');

exports.verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(403).send({ message: 'Aucun token fourni!' });
    }
    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Non autorisé!' });
        }
        req.userId = decoded.id;
        next();
    });
};
