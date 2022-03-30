const express = require("express");
const router = express.Router();
module.exports = router;


router.use(require("./AuthRoute"))
router.use(require("./DefaultRoute"))
