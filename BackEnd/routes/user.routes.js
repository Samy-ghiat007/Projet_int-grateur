// Routes utilisateur
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/profile', authMiddleware.verifyToken, userController.getProfile);
// http://localhost:5000/api/users/profile

module.exports = router;
