const express = require('express');

const petController = require('../controller/petController');
const userController = require('../controller/userController');

const router = express.Router();

/* CRUD FUNCTIONALITY FOR PETS ON DASHBOARD PAGE */

// get all pets
router.get('/', petController.getPets, (req, res) => {
    return res.status(200).json(res.locals.petInfo);
});

// create a pet
router.post('/add-pet', petController.addPet, (req, res) => {
    return res.status(200).json(res.locals.newPet);
});

// // update a pet 
router.put('/:id', petController.updatePet);

// // delete a pet 
router.delete('/:id', petController.deletePet, (req, res) => {
    res.status(204).send('Success: Deleted Pet');
});

// going to need create post methods for /signup routes - also needs to create front end file paths to resolve to this file after we pass in a controller to setcookie, createUser, and setSSIDcookie 

/* FUNCTIONALITY FOR IMAGE LOADING */


/* AUTHENTICATION FUNCTIONALITY TO LOGIN  */

// /**
// * signup
// */
// app.get('/signup', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../client/signup.html'));
// });
// router.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../client/index.html'))
// })

// router.get('/login', (req, res) => {
//     return res.status(200);
// });

router.post('/register',
    userController.registerUser,
    (req, res) => {
        // what should happen here on successful sign up?
        res.status(200).json({ message: 'Registration Successful' });
        res.redirect('/login');
    });

// for /login route, will need to post method to redirect to the homepage of app and pass in controller of verifyuser, start seshion, and setssidcookie before redirecting
router.post('/login',
    userController.loginUser,
    (req, res) => {
        // what should happen here on successful log in?
        res.redirect('/');
    });

module.exports = router;