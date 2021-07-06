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

const getProduct = (req, res) => {
    console.log(req.params)
    const id = req.params.id;
    console.log(id);
    pool.query('SELECT * FROM products WHERE product_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}


const getUser = (req, res) => {
    const email = req.params.email;
    pool.query('SELECT * FROM customers WHERE email = $1', [email], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    })
}

const getOrderHistory = (req, res) => {
    const customer_id = req.params.customer_id;
    const status = req.body;
    pool.query('SELECT * FROM orders WHERE customer_id = $1 AND status = $2', [customer_id, status], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    })
}


const addUser = (req, res) => {
    const {first_name, surname, username, email, saltyhash, address_line1, address_line2, town, county, postcode} = request.body

    pool.query
    ('INSERT INTO customers(first_name, surname, username, email, saltyhass, address_line1, address_line2, town, county, postcode) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', 
    [first_name, surname, username, email, saltyhash, address_line1, address_line2, town, county, postcode], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(201).send(`User added with ID: ${results.rows[0].customer_id}`)
    })
}

module.exports = {
    getProducts,
    getProduct,
    getUser, 
    getOrderHistory,
    addUser, 
};