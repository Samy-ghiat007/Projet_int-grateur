const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.config');

exports.verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];

    // Remove double quotes from the token if they exist
    if (token) {
        token = token.replace(/"/g, '');
    }

    console.log(token);

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
