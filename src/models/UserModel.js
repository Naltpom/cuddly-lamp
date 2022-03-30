const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = model;

function model(sequelize) {
    const attributes = {
        uuid: { type: DataTypes.UUID, primaryKey: true, defaultValue: uuidv4 },
        username: { type: DataTypes.STRING(64), allowNull: false, unique: true },
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
    };

    return sequelize.define('user', attributes);
};
