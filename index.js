//load env vars
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

//import dependencies 
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const multer = require('multer');
const pool = require('./server/db/connectToDb');

const app = express();
app.use(cookieParser());

const PORT = process.env.PORT || 4000;
const routeHandlers = require('./server/middleware/routes');

/* configurations for middlewares funcs */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(bodyParser.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images');
    },
    filename: (req, file, cb) => {
        console.log('file in route', file);
        // cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB limit (adjust as needed)
});

// handle req for static files using path.resolve
app.use(express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, path) => {
        if (path.endsWith('.jpg') || path.endsWith('.png') || path.endsWith('.jpeg')) {
            res.setHeader('Content-Type', 'image/jpeg');
        }
    }
}));

// app.use('/dist', express.static(path.join(__dirname, 'dist')));

// serve index.html on the route '/'
app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/pets', routeHandlers);


app.post('/pets/dashboard/upload/:pet_id', upload.single('image'), async (req, res, next) => {
    const image = req.file.filename;
    const id = req.params.pet_id;
    console.log('image filename in petcontroller', image)
    console.log('id in petcontroller', id)

    const query = `UPDATE pet SET image = $1 WHERE pet_id = $2`;

    try {
        await pool.query(query, [image, id]);
        // return res.json({ Status: 'Image Upload Success' });
        return res.redirect('/pets')
    } catch (error) {
        return next({
            log: `petController.addImage: ERROR: ${error}`,
            message: {
                err: 'Could not add pet image in petController.addImage. Check server logs for more details.'
            },
            status: 500
        });
    }
});

// app.get('/pets/dashboard/:pet_id', async (req, res) => {
//     const id = req.params.pet_id;

//     const query = `SELECT image FROM pet WHERE pet_id = $1`;

//     try {
//         const res = await pool.query(query, [id]);
//         console.log('res in get', res);
//         // return res.json({ image: imageUrl})
//     } catch (error) {

//     }
// })

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
