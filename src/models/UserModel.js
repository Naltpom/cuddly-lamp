const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

module.exports = model;

function model(sequelize, Sequelize) {
    return sequelize.define('User', {
        uuid: { type: Sequelize.UUID, primaryKey: true, defaultValue: uuidv4 },
        username: { type: Sequelize.STRING(64), allowNull: false, unique: true },
        firstName: { type: Sequelize.STRING(64), allowNull: true },
        familyName: { type: Sequelize.STRING(64), allowNull: true },
        email: { 
            type: Sequelize.STRING(191), 
            allowNull: false, 
            unique: true,
            validate: {
                isEmail: {
                    msg: 'error.email'
                }
            } 
        },
        password: { type: Sequelize.TEXT, allowNull: false },
        status: { type: Sequelize.JSON, allowNull: true },
        token: { type: Sequelize.TEXT, allowNull: true },
    }, {
        hooks : {
            beforeCreate : async (user, options) => {
                user.password = await bcrypt.hash(user.password, 10);
            },
            beforeUpdate : async (user, options) => {
                user.password = await bcrypt.hash(user.password, 10);
            }
        }
    })
};
