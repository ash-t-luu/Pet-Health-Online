const pool = require('../db/connectToDb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {};

userController.registerUser = async (req, res, next) => {
    const { name, email, password } = req.body;

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
        RETURNING *;`

        const values = [name, email, bcryptPassword];

        const newUser = await pool.query(createUser, values);

        const token = generateToken(newUser.rows[0].owner_id);
        res.json({ token });

        // res.locals.user = newUser.rows;
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
    try {

        const token = req.header('token');

        if (!token) {
            return res.status(403).json({ message: 'Unauthorized: Token not provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        return next();

    } catch (error) {
        return res.status(403).json({ message: 'Unauthorized: Invalid token' });
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

        const isPasswordValid = await bcrypt.compare(password, userResult.rows[0].user_password);

        if (!isPasswordValid) {
            return res.status(401).send('Invalid email or password');
        }

        const token = generateToken(userResult.rows[0].owner_id);
        // res.json({ token });

        // req.session.ownerInfo = userResult.rows[0];

        res.cookie('loginCookie', userResult.rows[0], { httpOnly: true });

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

function generateToken(owner_id) {
    const payload = { user: owner_id };
    const secretKey = process.env.JWT_SECRET;
    const token = jwt.sign(payload, secretKey, { expiresIn: '2m' });
    return token;
}


userController.verifyToken = async (req, res, next) => {
    try {
        res.json(true);
        return next();
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error in userController.verifyToken');
    }
};

userController.getUser = async (req, res, next) => {
    console.log('req', req)
    // console.log('req body', req.body)

    try {
        const user = await pool.query(`SELECT * FROM owner
        WHERE owner_id = $1`, [e]);

        res.locals.ownerInfo = user.rows[0]
        console.log('rows', res.locals.ownerInfo);
        return next();

    } catch (error) {
        console.error(error.message);
        res.status(500).json('Server Error in userController.getUser')
    }
}

module.exports = userController;