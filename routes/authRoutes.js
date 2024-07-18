const express = require('express');
const { body } = require('express-validator');

const authenticateJWT = require('../middlewares/authmiddleware');

const router = express.Router();
const authService = require('../services/authServiecs');
const bodyValidation = require('../middlewares/bodyValidationMiddleware');

router.post('/login', authService.login);

router.post('/register', body('email').isEmail(), bodyValidation, authService.register);

router.post('/refresh', authService.refresh);

router.patch('/logout', authenticateJWT, authService.logout);

module.exports = router;