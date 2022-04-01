const express = require("express");
const middleware = require('../middlewares/auth')
const router = express.Router();
module.exports = router;


router.use(require("./AuthRoute"))
router.use('/rooms', require("./RoomRoute"))
router.use('/', middleware, require("./DefaultRoute"))
router.use('/chats', middleware, require("./ChatRoute"))
