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

const stripe = require('stripe')('sk_test_51JCKsaGHGV93t4Gr7roeQW9u59jlWxyc288WB1hHhZqqBUA1pIbkkBJw5DMjTJQ0bOtt34jT99kcLAj7fTHiqcq300LbUewW1N')


app.get('/', (request, response) => {
  response.json({ info: `I really miss Miss Moneypenny` })
})


app.get('/success', (request, response) => {
  response.json({ info: `The checkout session has been activated!` })
})

app.get('/cancel', (request, response) => {
  response.json({ info: `The checkout session was an utter failure!` })
})

app.get('/products', db.getProducts);
app.get('/products/:id', db.getProduct);
app.get('/orderhistory/', db.getOrderHistory);
app.post('/users', db.addUser);
app.post('/login', passport.authenticate('local',  {failureRedirect: '/'}), ((req, res) => {
  res.status(201).json(req.user)
}))
  
app.get('/logout', ((req, res) => {
  req.logout();
  res.status(200).redirect('/');
}))

app.post('/order', db.addOrder);
app.post('/orderlines', db.addOrderLines);
app.put('/updateStock', db.updateStock);

app.post('/create-checkout-session', async (req, res) => {
  console.log('hello')
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'http:/localhost:3000/checkout',
    cancel_url: 'http://localhost:3000/cancel',
  });

  res.redirect(303, session.url);
});


module.exports = app;