const express = require("express");
const router = express.Router();
module.exports = router;

const authController = require('../controllers/AuthController.js');

router.get('/login', authController.getLogin);

router.post('/login', authController.postLogin);

router.get('/register', authController.getRegister);

router.post('/register', authController.postRegister);

router.get('/forgot-password', (req, res) => {
    res.render('components/pages/auth-forgot-password');
});

router.post('/forgot-password', (req, res) => {
    res.redirect(302, '/')
});

router.get('/logout', authController.getLogout);