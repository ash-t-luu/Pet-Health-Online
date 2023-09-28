//load env vars
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

//import dependencies 
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

const PORT = process.env.PORT || 4000;
const routeHandlers = require('./server/middleware/routes');

/* configurations for middlewares funcs */

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}))

// handle req for static files using path.resolve
app.use('/public', express.static(path.join(__dirname, 'public')));

// app.use('/dist', express.static(path.join(__dirname, 'dist')));

// serve index.html on the route '/'
app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, 'public', 'index.html'));
});

// might need to change the first param to actual path
app.use('/pets', routeHandlers);

// app.use((req, res) => res.status(404).send('This is not the page you\'re looking for...'));

app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 500,
        message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}...`);
});

module.exports = app;
