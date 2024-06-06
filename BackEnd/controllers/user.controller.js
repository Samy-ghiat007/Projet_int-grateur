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
