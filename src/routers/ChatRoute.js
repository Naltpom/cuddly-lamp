const express = require("express");
const middleware = require('../middlewares/auth')

const router = express.Router();
module.exports = router;

router.get('/chats', middleware, (req, res) => {
    res.render('components/pages/chat');
});