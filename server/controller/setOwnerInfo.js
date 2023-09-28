const pool = require('../db/connectToDb');

const setOwnerData = {};

setOwnerData.add = async (req, res, next) => {

    // const { email, password } = req.query;

    // console.log('req.query in setOwner', req.query);
    // console.log('req.params in setOwner', req.params);
    // console.log('req.body in setOwner', req.body);


    try {
        // Use the email and password to fetch owner information
        // const result = await pool.query('SELECT * FROM owner WHERE user_email = $1', [email]);

        // res.locals.ownerInfo = result.rows;
        req.sesssi
        // res.locals.saveData = res.locals.ownerInfo;
        console.log('ownerinfo req,query ', res.locals.ownerInfo);
        return next();
    } catch (error) {
        return next({
            log: `setOwnerData.add: ERROR: ${error}`,
            message: {
                err: 'Could not load pet data in setOwnerData.add. Check server logs for more details.'
            },
            status: 500
        });
    }
}

module.exports = setOwnerData;