const { v4: uuidv4 } = require('uuid');
const db = require('../../config/db.config');

module.exports = model;

function model(sequelize, Sequelize) {
    return sequelize.define('Room', {
        uuid: { type: Sequelize.UUID, primaryKey: true, defaultValue: uuidv4 },
        title: { type: Sequelize.TEXT },
        description: { type: Sequelize.TEXT },
        picture: { type: Sequelize.TEXT },
        master: {
            type: Sequelize.UUID,
            references: {
                model: db.User, 
                key: 'uuid'
            }
        },
        createdBy: {
            type: Sequelize.UUID,
            references: {
                model: db.User, 
                key: 'uuid'
            }
        },
        updatedBy: {
            type: Sequelize.UUID,
            references: {
                model: db.User, 
                key: 'uuid'
            }
        },
    }, {
        hooks : {
            beforeCreate : (room, options) => {
                room.master = options.user.uuid ?? null;
                room.createdBy = options.user.uuid ?? null;
                room.updatedBy = options.user.uuid ?? null;
            },
            beforeUpdate : (room, options) => {
                console.log(options)
                room.updatedBy = options.user.uuid ?? null;
            }
        }
    })
};
