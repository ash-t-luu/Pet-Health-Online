const db = require('../db/connectToDb');

const petController = {};

petController.getPets = async (req, res, next) => {
    //db query - accessing the id

    try {
        //await query to return promise
        //do something with this and store on res.locals
        //return next 
    } catch (error) {
        //return global error with specific pieces involved 
    }
}


petController.addPet = async (req, res, next) => {
    //destructure given attributes to req.body

    //edge cases if none are added

    //db query - insert into

    //and array of values - using $1

    try {

    } catch (error) {
        //return global error with specific pieces involved 
    }
}


module.exports = petController;