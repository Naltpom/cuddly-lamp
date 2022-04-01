require('dotenv-flow').config({ silent: true });
const env = process.env;
const { v4: uuidv4 } = require('uuid');
const ucfirst = require("ucfirst");
const Jabber = require('jabber');
const jabber = new Jabber();
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');
const { RandomPicture } = require('random-picture');
const { getMaxListeners } = require('process');
const bcrypt = require('bcrypt');

initialize().then();

module.exports = db = {};

async function initialize() {

    const config = {
        'host': env.DATABASE_HOST,
        'port': env.DATABASE_PORT,
        'user': env.DATABASE_USERNAME,
        'password': env.DATABASE_PASSWORD,
        'database': env.DATABASE_NAME,
    };

    // create db if it doesn't already exist
    const { host, port, user, password, database } = config;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`DROP DATABASE IF EXISTS \`${database}\`;`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password, {
        dialect: 'mysql',
        logging: false,
        dialectOptions: {
            dateStrings: true,
            typeCast: true
        }, // timezone: 'Europe/Paris'
    });

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    // init models and add them to the exported db object
    db.Sequelize = Sequelize;
    db.sequelize = sequelize;
    db.User = require('../src/models/UserModel')(sequelize, Sequelize);
    db.Room = require('../src/models/RoomModel')(sequelize, Sequelize);
    db.Message = require('../src/models/MessageModel')(sequelize, Sequelize, db);
    db.UserRoom = require('../src/models/UserRoomModel')(sequelize, Sequelize, db);
    db.FriendModel = require('../src/models/FriendModel')(sequelize, Sequelize, db);

    // sync all models with database
    await sequelize.sync();

    db.User.create({ username: 'Admin', email: 'john.doe@gmail.com', password: '1234', firstName: 'john', familyName: 'doe' })
    db.User.create({ username: 'Jane', email: 'jane.doe@gmail.com', password: '1234', firstName: 'jane', familyName: 'doe' })
}
