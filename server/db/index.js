const {Pool} = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'sunshine_store',
    password: 'postgres',
    port: 5432
});

const getProducts = (req, res) => {
    pool.query('SELECT * FROM products ORDER BY product_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}




module.exports = {
    getProducts
};