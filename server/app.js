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
app.post('/login', passport.authenticate('local',  {failureRedirect: '/'}), ((req, res) => {
  res.status(201).json(req.user)
}))
  
app.get('/logout', ((req, res) => {
  req.logout();
  res.status(200).redirect('/');
}))

module.exports = app;