const pool = require('../db/connectToDb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {};

userController.registerUser = async (req, res, next) => {
    const { name, email, password, pet_ids } = req.body;

    if (!name || !email || !password) {
        return res.json('Invalid information provided');
    };

    try {
        //select user with new email 
        const user = await pool.query(`SELECT * FROM owner 
            WHERE user_email = $1`, [email]);

        if (user.rowCount > 1) {
            return res.status(401).send('User already exists');
        }

        //generate salt for password 
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        // insert user in database
        const createUser = `INSERT INTO owner (user_name,
        user_email,
        user_password)
        VALUES ($1, $2, $3)
        RETURNING owner_id;`

        const values = [name, email, bcryptPassword];

        const newUser = await pool.query(createUser, values);
        // const owner_id = newUser.rows[0].owner_id;

        // const insertOwnerPetQuery = `
        //     INSERT INTO owner_pet (owner_id, pet_id)
        //     VALUES ($1, $2);`;

        // for (let i = 0; i < pet_ids.length; i++) {
        //     await pool.query(insertOwnerPetQuery, [owner_id, pet_ids[i]]);
        //     console.log(pet_ids[i]);
        // }

        res.locals.user = newUser.rows;
        return next();
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

userController.authenticateUser = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Token not provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.userId;
        return next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
}

userController.loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    const findUserQuery = `
        SELECT * FROM owner
        WHERE user_email = $1`;

    try {
        const userResult = await pool.query(findUserQuery, [email]);

        if (userResult.rows.length === 0) {
            return res.status(401).send('Invalid email or password');
        }

        const user = userResult.rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.user_password);

        if (!isPasswordValid) {
            return res.status(401).send('Invalid email or password');
        }

        const token = generateToken(user);
        res.json({ token });
        return next();
    } catch (error) {
        return next({
            log: `userController.loginUser: ERROR: ${error}`,
            message: {
                err: 'Could not login user in userController.loginUser. Check server logs for more details.'
            },
            status: 500
        });
    }
};

function generateToken(user) {
    const payload = { userId: user.owner_id, userEmail: user.user_email };
    const secretKey = process.env.JWT_SECRET;
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    return token;
}

module.exports = userController;