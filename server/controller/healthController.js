const pool = require('../db/connectToDb');

const healthController = {};

healthController.getRecords = async (req, res, next) => {

    //select owner id from cookie and query that value to get the pet id associated with owner
    const owner_id = req.cookies.loginCookie.owner_id;

    const petRes = await pool.query(`SELECT pet_id FROM pet WHERE owner_id = $1`, [owner_id]);

    const petIds = petRes.rows;

    const petIdValues = petIds.map(obj => obj.pet_id);

    // const placeholders = petIdValues.map((_, index) => `$${index + 1}`).join(', ');
    // console.log('pet placeholder', placeholders);

    //query to select all the health records where the pet id matches the pet
    const recordData = `SELECT *, 
    TO_CHAR(date_visit::date, 'MM/DD/YYYY') AS formatted_date_visit,
    name 
    FROM health_record
    INNER JOIN pet USING (pet_id)
    WHERE pet_id = ANY($1::integer[])
    ORDER BY date_visit DESC;`;

    try {
        const result = await pool.query(recordData, [petIdValues]);

        if (result.rowCount === 0) {
            return res.status(403).json({ error: "No health records found" });
        }

        res.locals.records = result.rows;

        return next();
    } catch (error) {
        return next({
            log: `healthController.getRecords: ERROR: ${error} `,
            message: {
                err: 'Could not load pet data in healthController.getRecords. Check server logs for more details.'
            },
            status: 500
        });
    }
}


module.exports = healthController;