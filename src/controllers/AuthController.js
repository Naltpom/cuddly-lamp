const bcrypt = require('bcrypt');
const db = require('../../config/db.config');
const { Op } = require('sequelize');
const { signJwt } = require('../utils/jwt');

exports.getLogin = (req, res) => {
    res.render('components/pages/auth-login');
}

exports.getRegister = (req, res) => {
    res.render('components/pages/auth-register');
}

exports.postLogin = (req, res) => {
    const { username, password, remember } = req.body;
    db.User.findOne({where: {
        [Op.or]: [{ username: username }, { email: username }]
    }}).then(user => {
        if (null === user) {
            return res.render('components/pages/auth-login', { error: 'User not found' });
        }
        bcrypt.compare(password, user.password).then((valid) => {
            if (!valid) {
                return res.render('components/pages/auth-login', { error: 'Incorrect password!' })
            }

            session = req.session;
            session.user = user;
            session.token = signJwt(user.uuid, undefined === remember ? false : true);

            res.redirect(302, '/');
        }).catch(error => {
            res.status(500).json({ error: error });
        })
    })
}

exports.postRegister = (req, res) => {
    console.log('post register')
    console.log(req.body)
    const { username, email, password, privacyPolicy } = req.body;

    db.User.create({
        username: username,
        password: password,
        email: email
    }).then(user => {
        res.redirect(308, '/login')
    }).catch(error => {
        console.log(error)
        res.render('components/pages/auth-register', { error: error });
    });
}

exports.getLogout = (req, res) => {
    req.session.destroy()
    res.clearCookie('connect.sid') // clean up!
    res.redirect(302, '/login')
}

