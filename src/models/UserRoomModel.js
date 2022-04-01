const { v4: uuidv4 } = require('uuid');

module.exports = model;

function model(sequelize, Sequelize, db) {
    return sequelize.define('UserRoom', {
        uuid: { type: Sequelize.UUID, primaryKey: true, defaultValue: uuidv4 },
        notification: { type: Sequelize.BOOLEAN, defaultValue: true },
        state: { type: Sequelize.ENUM, values: ['accepted', 'refused'] },
        admin: { type: Sequelize.BOOLEAN, defaultValue: false },
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
        invitedBy: {
            type: Sequelize.UUID,
            references: {
                model: db.User, 
                key: 'uuid'
            }
        },
    })
};
