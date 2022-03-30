const express = require("express");
const router = express.Router();
module.exports = router;

module.exports = {
    Auth: require("./AuthRoute"),
    Default: require("./DefaultRoute"),
};