const { signJwt, verifyJwt } = require('../utils/jwt');

module.exports = (req, res, next) => {
    try {
        const user = req.session.user;
        const decodedtoken = verifyJwt(req.session.token);
        const uuid = decodedtoken.uuid;
        if (user.uuid && user.uuid !== uuid) {
            throw 'user ID non valable';
        }

        session = req.session;
        session.token = signJwt(user.uuid, decodedtoken.remember)

        next();
    } catch (error) {
        res.redirect(302, '/logout')
    }
}
