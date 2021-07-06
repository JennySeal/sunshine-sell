const express = require('express')
const cors = require('cors');
const app = express()
const db = require('./db/index')


app.use(cors())

app.get('/', (request, response) => {
  response.json({ info: `I really miss Miss Moneypenny` })
})


app.get('/products', db.getProducts);
app.get('/products/:id', db.getProduct);
app.get('/user/:email', db.getUser);
app.get('/orders/', db.getOrderHistory);
app.post('/users', db.addUser);

module.exports = app;