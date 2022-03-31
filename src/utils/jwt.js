const jwt = require('jsonwebtoken');
const jwtSecret = 'RANDOM_TOKEN_SECRET'

exports.signJwt = (uuid, remember) => {
    return jwt.sign(
        { uuid: uuid, remember: remember ?? false }, 
        jwtSecret, 
        { expiresIn: false === remember ? '2h' : '24h' }
    );
}

exports.verifyJwt = (token) => {
    return jwt.verify(token, jwtSecret);
}