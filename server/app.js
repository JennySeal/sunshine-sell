const express = require('express')
const app = express()
const db = require('./db/index')


app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: `I really miss Miss Moneypenny` })
})


app.get('/products', db.getProducts);

module.exports = app;