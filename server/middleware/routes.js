const express = require('express');

const petController = require('../controller/petController');
const userController = require('../controller/userController');
const healthController = require('../controller/healthController');

const router = express.Router();

/* CRUD FUNCTIONALITY FOR PETS ON DASHBOARD PAGE */

// get all pets
router.get('/', petController.getPets, (req, res) => {
    return res.status(200).json(res.locals.petInfo);
});

router.get('/pet-records', healthController.getRecords, (req, res) => {
    return res.status(200).json(res.locals.records);
})

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



/* FUNCTIONALITY FOR HEALTH RECORDS */

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