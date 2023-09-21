//load env vars
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

//import dependencies 
const express = require('express');
const cors = require('cors');
const path = require('path');

const pool = require('./connectToDb2');

const app = express();

const routeHandlers = require('./server/middleware/routes');

/* configurations for middlewares funcs */

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// handle req for static files using path.resolve

// might need to change the first param to actual path
app.use('/routes', routeHandlers);

app.use((req, res) => res.status(404).send('This is not the page you\'re looking for...'));

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

app.listen(process.env.PORT, () => {
    console.log(`Listening on PORT ${process.env.PORT}`);
});

module.exports = app;
