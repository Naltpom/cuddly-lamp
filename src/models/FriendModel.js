const { v4: uuidv4 } = require('uuid');

module.exports = model;

function model(sequelize, Sequelize, db) {
    return sequelize.define('Friend', {
        uuid: { type: Sequelize.UUID, primaryKey: true, defaultValue: uuidv4 },
        state: { type: Sequelize.ENUM, values: ['accepted', 'refused', 'blocked'] },
        userRef: {
            type: Sequelize.UUID,
            references: {
                model: db.User, 
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
