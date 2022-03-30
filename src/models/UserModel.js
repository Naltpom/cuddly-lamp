const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const sequelize = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = model;

function model(sequelize) {
    return sequelize.define('User', {
        uuid: { type: DataTypes.UUID, primaryKey: true, defaultValue: uuidv4 },
        username: { type: DataTypes.STRING(64), allowNull: false, unique: true },
        firstName: { type: DataTypes.STRING(64), allowNull: true },
        familyName: { type: DataTypes.STRING(64), allowNull: true },
        email: { 
            type: DataTypes.STRING(191), 
            allowNull: false, 
            unique: true,
            validate: {
                isEmail: {
                    msg: 'error.email'
                }
            } 
        },
        password: { type: DataTypes.TEXT, allowNull: false },
        status: { type: DataTypes.JSON, allowNull: true },
        token: { type: DataTypes.TEXT, allowNull: true },
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
