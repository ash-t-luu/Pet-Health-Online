const express = require('express');
const petController = require('../controller/petController');
const userController = require('../controller/userController');
const healthController = require('../controller/healthController');

const multer = require('multer');
const path = require('path');

const router = express.Router();

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, '../public/images');
//     },
//     filename: (req, file, cb) => {
//         console.log('file in route', file);
//         // cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
//         cb(null, Date.now() + path.extname(file.originalname))
//     }
// });

// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB limit (adjust as needed)
// });

/* CRUD FUNCTIONALITY FOR PETS ON DASHBOARD PAGE */
// get all pets
router.get('/', petController.getPets, (req, res) => {
    return res.status(200).json(res.locals.petInfo);
});

/* FUNCTIONALITY FOR HEALTH RECORDS */
router.get('/pet-records', healthController.getRecords, (req, res) => {
    return res.status(200).json(res.locals.records);
});

// router.post('/dashboard/upload/:id', upload.single('image'), function (req, res) {
//     console.log('form field', req.body) // form fields
//     console.log('form file', req.file) // form files
//     res.status(204).end()
// });

// // create a pet
// router.post('/add-pet', petController.addPet, (req, res) => {
//     return res.status(200).json(res.locals.newPet);
// });

// // // update a pet 
// router.put('/:id', petController.updatePet);

// // // delete a pet 
// router.delete('/:id', petController.deletePet, (req, res) => {
//     return res.status(204).send('Success: Deleted Pet');
// });

/* AUTHENTICATION FUNCTIONALITY TO LOGIN  */

router.post('/register',
    userController.registerUser,
    (req, res) => {
        res.status(200).json({ message: 'Registration Successful' });
        res.redirect('/login');
    });


router.post('/login',
    userController.loginUser,
    (req, res) => {
        return res.status(200).json('Login success');
    });

// router.post('/verify', userController.authenticateUser, userController.verifyToken, (req, res) => {
//     res.redirect('/dashboard');
// });

module.exports = router;