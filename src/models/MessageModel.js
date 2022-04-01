const { v4: uuidv4 } = require('uuid');

module.exports = model;

function model(sequelize, Sequelize, db) {
    return sequelize.define('Message', {
        uuid: { type: Sequelize.UUID, primaryKey: true, defaultValue: uuidv4 },
        type: { type: Sequelize.ENUM, values: ['text', 'voice', 'image', 'video'] },
        content: { type: Sequelize.TEXT },
        userRef: {
            type: Sequelize.UUID,
            references: {
                model: db.User, 
                key: 'uuid'
            }
        },
        roomRef: {
            type: Sequelize.UUID,
            references: {
                model: db.Room, 
                key: 'uuid'
            }
        },
    })
};
