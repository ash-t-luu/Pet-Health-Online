const express = require('express');

const petController = require('../controller/petController');

const router = express.Router();

// get all pets
router.get('/', _, (req, res) => {
    //res.status(200).json(res.locals.speciesInfo) or something
});


// create a pet
router.post('/pet', _, (req, res) => {

});

// update a pet 
router.patch('/', _, (req, res) => {

});

// delete a pet 
router.delete('/', _, (req, res) => {

});

app.get('/', (req, res) => {
    res.json('hello world');
});

module.exports = router;