const pool = require('../db/connectToDb');

const healthController = {};

healthController.getRecords = async (req, res, next) => {
    const petId = req.params.id;

    try {
        const result = await pool.query('SELECT * FROM health_record WHERE pet_id = $1', [petId]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "No health records found" });
        }

        res.locals.records = result.rows;
        return next();
    } catch (error) {
        return next({
            log: `healthController.getRecords: ERROR: ${error}`,
            message: {
                err: 'Could not load pet data in healthController.getRecords. Check server logs for more details.'
            },
            status: 500
        });
    }
}


module.exports = healthController;