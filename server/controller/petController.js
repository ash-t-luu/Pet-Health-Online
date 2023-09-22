const pool = require('../db/connectToDb');

const petController = {};

petController.getPets = async (req, res, next) => {
    const petData = `SELECT * FROM pet`;

    try {
        //await query to return promise
        const result = await pool.query(petData);

        if (result.rowCount === 0) {
            res.status(404).json({ error: "No pets found" });
        }
        //do something with this and store on res.locals
        res.locals.petInfo = result.rows;
        //return next 
        return next();
    } catch (error) {
        //return global error with specific pieces involved 
        return next({
            log: `petController.getPets: ERROR: ${error}`,
            message: {
                err: 'Could not load pet data in petController.getPets. Check server logs for more details.'
            },
            status: 500
        });
    }
};

petController.addPet = async (req, res, next) => {
    //destructure given attributes to req.body
    const { name, dob, age, species, breed, gender, weight_lb } = req.body;

    //edge cases if none are added
    if (!name || !dob || !age || !species || !breed || !gender || !weight_lb) {
        return next({
            log: 'Missing data in petController.addPet',
            message: {
                err: 'Error occurred in petController.addPet: Missing data.'
            },
            status: 401
        });
    };

    //db query - insert into
    const createPet = `INSERT INTO pet (name, dob, age, species, breed, gender, weight_lb)
    VALUES ($1, $2, $3, $4, $5, $6, $7);`
    const values = [name, dob, age, species, breed, gender, weight_lb];
    //and array of values - using $1

    try {
        const result = await pool.query(createPet, values);
        // result.release();
        res.locals.newPet = result.rows;
        return next();
    } catch (error) {
        //return global error with specific pieces involved
        return next({
            log: `petController.addPet: ERROR: ${error}`,
            message: {
                err: 'Could not add pet data in petController.addPet. Check server logs for more details.'
            },
            status: 500
        });
    }
};

petController.updatePet = async (req, res, next) => {
    //id = access the id we are targeting using req.query.id
    const id = req.params.id;
    //deconstruct new info wanted in req.body
    const value = req.body;

    //edge case: if there is one attribute to update in req.body
    if (Object.keys(value).length === 0) {
        return res.status(400).json({ error: 'No attributes to update provided' });
    };

    const columnsToUpdate = Object.keys(value);
    // console.log('column', columnsToUpdate) = ['weight_lb', 'age']
    const valuesToUpdate = columnsToUpdate.map((col, i) => `$${i + 1}`);
    // console.log('values', valuesToUpdate); = [$1, $2]

    //generate the set caluse for sql query dynamically
    const setClause = columnsToUpdate.map((col, i) => `${col} = ${valuesToUpdate[i]}`).join(', ');
    // console.log('set', setClause); = weight_lb = $1, age = $2

    //clause = db.query what needs to be selected in the table WHERE _id = $1
    const query = `UPDATE pet SET ${setClause} WHERE pet_id = $${columnsToUpdate.length + 1}`;

    //create a values with an array 
    const queryValues = [...Object.values(value), id];
    // console.log('arr', queryValues); [11, 3, '6']

    try {
        const result = await pool.query(query, queryValues);
        if (result.rowCount === 1) {
            res.status(200).json({ message: 'Pet updated successfully' });
        } else {
            res.status(404).json({ error: 'Pet not found' });
        }
    } catch (error) {
        return next({
            log: `petController.updatePet: ERROR: ${error}`,
            message: {
                err: 'Could not add pet data in petController.updatePet. Check server logs for more details.'
            },
            status: 500
        });
    }
};

petController.deletePet = async (req, res, next) => {
    //select the req.params.id again?
    const id = req.params.id;

    //this time we just want to delete the pet
    const query = `DELETE FROM pet WHERE pet_id = $1`

    try {
        const result = await pool.query(query, [id]);
        if (result.rowCount === 0) {
            res.status(404).json({ message: 'Could not find pet' });
        }
        return res.status(204).send();
    } catch (error) {
        return next({
            log: `petController.deletePet: ERROR: ${error}`,
            message: {
                err: 'Could not delete pet in petController.deletePet. Check server logs for more details.'
            },
            status: 500
        });
    }
}

module.exports = petController;