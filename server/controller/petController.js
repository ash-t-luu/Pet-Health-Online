const pool = require('../db/connectToDb');

const petController = {};

petController.getPets = async (req, res, next) => {
    // let owner_id = req.session.ownerInfo.owner_id;
    // console.log('req.cookies in pet controller', req.cookies.loginCookie);
    const owner_id = req.cookies.loginCookie.owner_id;

    try {
        const petData = `SELECT *, TO_CHAR(dob::date, 'MM/DD/YYYY') AS formatted_dob FROM pet WHERE owner_id = $1`;
        const result = await pool.query(petData, [owner_id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "No pets found" });
        }

        res.locals.petInfo = result.rows;

        return next();
    } catch (error) {
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
    const { name, dob, age, species, breed, gender, weight_lb } = req.body;

    if (!name || !dob || !age || !species || !breed || !gender || !weight_lb) {
        return next({
            log: 'Missing data in petController.addPet',
            message: {
                err: 'Error occurred in petController.addPet: Missing data.'
            },
            status: 401
        });
    };

    const createPet = `INSERT INTO pet (name, dob, age, species, breed, gender, weight_lb)
    VALUES ($1, $2, $3, $4, $5, $6, $7);`
    const values = [name, dob, age, species, breed, gender, weight_lb];

    try {
        const result = await pool.query(createPet, values);
        res.locals.newPet = result.rows;
        return next();
    } catch (error) {
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
    const id = req.params.id;
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

    const query = `UPDATE pet SET ${setClause} WHERE pet_id = $${columnsToUpdate.length + 1}`;

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
    const id = req.params.id;
    console.log('id in backend', id);
    //this time we just want to delete the pet
    const query = `DELETE FROM pet WHERE pet_id = $1`;

    try {
        const result = await pool.query(query, [id]);
        if (result.rowCount === 0) {
            res.status(404).json({ message: 'Could not find pet' });
        }
        return next();
    } catch (error) {
        console.error(`petController.deletePet: ERROR: ${error}`);
        return next({
            log: `petController.deletePet: ERROR: ${error}`,
            message: {
                err: 'Could not delete pet in petController.deletePet. Check server logs for more details.'
            },
            status: 500
        });
    }
}

// for (let i = 0; i < ownerInfoArray.length; i++) {
//     if (email === ownerInfoArray[i].user_email) {
//         owner_id = ownerInfoArray[i].owner_id;
//         console.log('owner_id in loop', owner_id);
//     }
// }

module.exports = petController;