const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const user = req.session.user;
        const decodedtoken = jwt.verify(req.session.token, 'RANDOM_TOKEN_SECRET');
        const uuid = decodedtoken.uuid;
        if (user.uuid && user.uuid !== uuid) {
            throw 'user ID non valable';
        }

        session = req.session;
        session.token = jwt.sign(
            { uuid: user.uuid, remember: decodedtoken.remember ?? false }, 
            'RANDOM_TOKEN_SECRET', 
            { expiresIn: false === decodedtoken.remember ? '10s' : '24h' }
        );

        next();
    } catch (error) {
        res.redirect(302, '/logout')
    }
}