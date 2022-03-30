const express = require("express");
const router = express.Router();
module.exports = router;


router.get('/login', (req, res) => {
    res.render('components/pages/auth-login');
});
router.get('/register', (req, res) => {
    res.render('components/pages/auth-register');
});
router.get('/forgot-password', (req, res) => {
    res.render('components/pages/auth-forgot-password');
});