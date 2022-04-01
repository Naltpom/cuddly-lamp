const express = require("express");
const db = require('../../config/db.config')
const router = express.Router();
module.exports = router;

router.get('', (req, res) => {
    // db.Room.findOne({where: {test: 'rtr'}}).then(r => {
    //     console.log(r)
    //     if (null === r) {
    //         db.Room.create({
    //             test: 'rtr',
               
    //         }, {user: req.session.user})
    //     } else {
    //         r.update({test: 'tata'}, {user: req.session.user})
    //     }
    // }).catch(e => console.log(e))
        
    res.render('components/pages/chat');
});