require('dotenv-flow').config({ silent: true });
const env = process.env;
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
    resave: false,
});
io.use((socket, next) => {
    middlewareSession(socket.request, {}, next);
});
app.use(middlewareSession);
app.use((req, res, next) => {
    if (req.session != undefined && req.session.user != null)
        res.locals.me = req.session.user;
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

app.use(router.Auth);
app.use(router.Default);

io.on('connection', (socket) => {
    console.log('connection')
});


app.use((req, res) => {
    res.render('components/pages/not-found');
});

const port = process.env.PORT || 3000;
server.listen(port, () => {console.log('Server app listening on port ' + port);console.log(`http://localhost:${port}`)});