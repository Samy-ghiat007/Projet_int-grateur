// Routes utilisateur
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/profile', authMiddleware.verifyToken, userController.getProfile);
// http://localhost:5000/api/users/profile

// Route pour mettre à jour le profil utilisateur
router.put('/profile', authMiddleware.verifyToken, userController.updateProfile);

module.exports = router;
