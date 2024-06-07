// Routes d'authentification
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/register', authController.register);
// http://localhost:5000/api/auth/register

router.post('/login', authController.login);
// http://localhost:5000/api/auth/login

module.exports = router;
