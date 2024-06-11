// Contrôleur pour l'authentification
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const authConfig = require('../config/auth.config');

exports.register = async (req, res) => {
    // Enregistrement d'un nouvel utilisateur
    const { name, lastName, email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        await User.create({ name, lastName, email, username, password: hashedPassword });
        res.status(201).send({ message: 'Utilisateur créé avec succès!' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.login = async (req, res) => {
    console.log(req.body)
    const { username, password } = req.body;
    console.log(username, password)
    const user = await User.findOne({ where: { username } });
    if (!user) {
        return res.status(404).send({ message: 'Utilisateur non trouvé!' });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(401).send({ message: 'Mot de passe incorrect!' });
    }
    const token = jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: 86400 // 24 heures
    });
    res.status(200).send({ accessToken: token });
};
