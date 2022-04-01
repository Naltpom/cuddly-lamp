const express = require("express");
const router = express.Router();
module.exports = router;

const roomController = require('../controllers/RoomController.js');

router.get('', roomController.all);
router.post('', roomController.create);
router.get('/:uuid', roomController.one);
router.put('/:uuid', roomController.update);
router.delete('/:uuid', roomController.delete);
router.post('/:uuid/invite', roomController.invite);
router.put('/:uuid/invite/:status', roomController.status);

