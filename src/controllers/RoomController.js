const db = require('../../config/db.config');
const Room = db.Room;

async function getUser(req) {
    session = req.session
    if (undefined === session.user) {
        session.user = await db.User.findOne({where: {username: 'Admin'}}).then(u => u.dataValues)
    }
    return session
}

/**
 * @method POST
 * @description Create a new room
 * @pathname /rooms/:uuid
 * @param {*} req 
 * @param {*} res 
 */
exports.create = (req, res) => {

};

/**
 * @method PUT
 * @description Update a new room
 * @pathname /rooms/:uuid
 * @param {*} req 
 * @param {*} res 
 */
exports.update = (req, res) => {

};

/**
 * @method DELETE
 * @description Delete a new room
 * @pathname /rooms/:uuid
 * @param {*} req 
 * @param {*} res 
 */
exports.delete = (req, res) => {

}

/**
 * @method GET
 * @description Get all room (with params)
 * @pathname /rooms
 * @param {*} req 
 * @param {*} res 
 */
exports.all = async (req, res) => {
    res.render('components/pages/index-modal');
}

/**
 * @method GET
 * @description Get a specific room 
 * @pathname /rooms/:uuid
 * @param {*} req 
 * @param {*} res 
 */
exports.one = async (req, res) => {
    console.log('first')
    res.render('components/pages/index-modal');
}

/**
 * @method POST
 * @description Invite users to rooms
 * @pathname /rooms/:uuid/invite
 * @bodyparam users[]
 * @param {*} req 
 * @param {*} res 
 * @param {array} req.body.users
 */
exports.invite = (req, res) => {

}

/**
 * @method PUT
 * @description Invite users to rooms
 * @pathname /rooms/:uuid/invite/:status
 * @enum ['accept', 'refused']
 * @param {*} req 
 * @param {*} res 
 */
exports.status = (req, res) => {

}