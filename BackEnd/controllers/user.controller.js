// Contrôleur pour les opérations utilisateur
const User = require('../models/user.model');

exports.getProfile = async (req, res) => {
    // Récupération du profil utilisateur
    const user = await User.findByPk(req.userId, { attributes: ['name', 'lastName', 'email', 'username'] });
    if (!user) {
        return res.status(404).send({ message: 'Utilisateur non trouvé!' });
    }
    res.status(200).send(user);
};

exports.updateProfile = async (req, res) => {
    try {
        const { name, lastName, email, username } = req.body;
        const user = await User.findByPk(req.userId);
        if (!user) {
            return res.status(404).send({ message: 'Utilisateur non trouvé!' });
        }

        user.name = name;
        user.lastName = lastName;
        user.email = email;
        user.username = username;
        
        await user.save();
        
        res.status(200).send({ message: 'Profil mis à jour avec succès!' });
    } catch (error) {
        res.status(500).send({ message: 'Erreur lors de la mise à jour du profil utilisateur.' });
    }
};