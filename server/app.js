const express = require('express')
const cors = require('cors');
const app = express()
const db = require('./db/index')
const passport = require('passport')
require('./passport');

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (request, response) => {
  response.json({ info: `I really miss Miss Moneypenny` })
})

app.get('/products', db.getProducts);
app.get('/products/:id', db.getProduct);
app.get('/orders/', db.getOrderHistory);
app.post('/users', db.addUser);
app.post('/login', passport.authenticate('local'), ((req, res, next) => {
  console.log(req.user)
  res.status(201).json(req.user)
}))

module.exports = app;