const pool = require('../db/connectToDb');

const userController = {};

userController.registerUser = async (req, res, next) => {
    const { name, email, password, pet_id } = req.body;

    const createUser = `INSERT INTO owner (user_name,
    user_email,
    user_password, pet_id)
    VALUES ($1, $2, $3, $4);`
    const values = [name, email, password, pet_id];

    try {
        const user = await pool.query(createUser, values);

        if (user.rowCount > 1) {
            return res.status(401).send('User already exists');
        }
        res.locals.user = user.rows;

    } catch (error) {
        return next({
            log: `userController.registerUser: ERROR: ${error}`,
            message: {
                err: 'Could not register user in userController.registerUser. Check server logs for more details.'
            },
            status: 500
        })
    }
}

userController.loginUser = async (req, res, next) => {

};

module.exports = userController;