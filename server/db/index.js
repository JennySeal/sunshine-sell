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


const login = async (req) => {
    const username = req;
    const res = await pool.query('SELECT * FROM customers WHERE username = $1', [username]) 
      return res.rows
    }

const addUser = (req, res) => {
    console.log(req.body)
    const {address_line1, address_line2, town, county, postcode, email, saltyhash, username, first_name, surname} = req.body;
    console.log(address_line1)

    pool.query
    ('INSERT INTO customers(address_line1, address_line2, town, county, postcode, email, saltyhash, username, first_name, surname) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *', 
    [address_line1, address_line2, town, county, postcode, email, saltyhash, username, first_name, surname], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(201).send(`User added with ID: ${results.rows[0].customer_id}`)
    })
}


const getOrderHistory = (req, res) => {
    const customer_id = req.params.customer_id;
    const status = req.body;
    pool.query('SELECT * FROM orders WHERE customer_id = $1 AND status = $2', [customer_id, status], (error, results) => {
        if (error) {
            return error;
        }
      return res.rows;
    })
}



module.exports = {
    getProducts,
    getProduct,
    login, 
    getOrderHistory,
    addUser, 
};