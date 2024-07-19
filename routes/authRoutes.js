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
router.patch('/changePassword', authenticateJWT, authService.changePW);
router.post('/verifyBeforeQuit', authenticateJWT, authService.verifyPasswordBeforeQuit);
router.delete('/quit', authenticateJWT, authService.quitService);

module.exports = router;