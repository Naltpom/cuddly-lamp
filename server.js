require('dotenv-flow').config({ silent: true });
const env = process.env;
const db = require('./config/db.config');
const express = require('express');
const cookieParser = require('cookie-parser');
const sessions = require('express-session');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const http = require('http');
const router = require('./src/routers/index');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

// session middleware
const oneDay = 1000 * 60 * 60 * 24;
const middlewareSession = sessions({
    secret: 'thisismysecrctekeyfhrgfgrfrty84fwir767',
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: true,
});
io.use((socket, next) => {
    middlewareSession(socket.request, {}, next);
});
app.use(middlewareSession);
app.use(async (req, res, next) => {
    if (req.session !== undefined && req.session.user !== undefined) {
        res.locals.me = req.session.user;

    // @todo to remove this is temporal no login
    } else if (req.session !== undefined && undefined === req.session.user) {
        session = req.session;
        session.user = await db.User.findOne({where: {username: 'Admin'}}).then(u => u.dataValues)
        res.locals.me = session.user
    }
    next();
});

app.use(express.static(path.join(__dirname, 'assets')));
app.set('views', __dirname + '/templates');
app.set('view engine', 'ejs');
app.use(
    fileUpload({
        createParentPath: true,
    })
);

app.use(cookieParser());
app.use(morgan('combined'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

io.on('connection', (socket) => {
    console.log('connection')
});


app.use((req, res) => {
    res.render('components/pages/not-found');
});

const port = process.env.PORT || 3000;
server.listen(port, () => {console.log('Server app listening on port ' + port);console.log(`http://localhost:${port}`)});