import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';


import './styles/App.css';

import Header from './components/Header';
import Login from './components/Login';
import Cart from './components/Cart';
import Products from './components/Products';
import ProductItem from './components/ProductItem';
import Checkout from './components/Checkout';
import Footer from './components/Footer';
import FourOhFour from './components/FourOhFour';

import { useSelector, useDispatch } from 'react-redux';
import { selectCart } from './slice_reducers/cartSlice';
import { selectCustomer, loggedOutOfCustomerDb, talkingToCustomerDbFailed } from './slice_reducers/customerSlice';
import Register from './components/Register';

const axios = require('axios');
const stripePromise = loadStripe('pk_test_51JCKsaGHGV93t4GrPTQd9yp3q1oMsZ9dbolIoS5OXQcO3u46Eh1pZatSFHH6iR7l6Gk6i4kiPLtenChOxBCVHYlK00V3I8acpe');

const App = () => {
  
  const dispatch = useDispatch();

  const cart = useSelector(selectCart)
  const cartCounter = cart.length;
  const customerInfo = useSelector(selectCustomer);
  const loggedIndicator = customerInfo.isLoggedin;

  const logoutOfDb = async() => { 
    try {
    const response = await axios.get(`${API_Endpoint}/logout`)
    if (response.status === 200) {
    dispatch(loggedOutOfCustomerDb(response.data))    
}}
    catch (error) {
    dispatch(talkingToCustomerDbFailed)
};
};

  const logout = (e) => {
    e.preventDefault()
    logoutOfDb()
  }

  return (
    <Router>
      <div id="mainContainer">
      <Header/>
      <nav>
      <Link to="/"><img src="images/homeIcon.png" alt="Homepage Icon" id="homepageIcon"/></Link>
            <Link to="/cart"><img src="images/shoppingBagIcon.png" alt="Shopping Bag Icon for Cart" id="shoppingBag"/><span id="cartCounter">{cartCounter}</span></Link>
            {!loggedIndicator && <Link to="/login"><p>Log In / Register</p></Link>}
            {loggedIndicator &&  <div id='hiAndLogout'><p>Hi {customerInfo.data.first_name}! </p><button onClick={logout}>Logout</button></div>}
  
            </nav>
        <Switch>
        <Route exact path="/">
        <div className='innerContainer'>
            <Products/>  
            </div>
            </Route>
        <Route path="/cart">
        <div className='innerContainer'>
            <Cart/>
            </div>
            </Route>

        <Route path="/login">
        <div className='innerContainer'>
            <Login/>
            </div>
            </Route>

        <Route path="/products/:id">
        <div className='innerContainer'>
        <ProductItem />
        </div>
        </Route>

        <Route path="/register">
        <div id='formContainer'>
        <Register />
        </div>
        </Route>

        <Route path="/checkout">
        <div className='innerContainer'>
        <Elements stripe={stripePromise}>
        <Checkout />
        </Elements>
        </div>
        </Route>

        <Route path="/*">
        <div className='innerContainer'>
        <FourOhFour />
        </div>
        </Route>

        </Switch>
    <Footer/>
    </div>
    </Router>
  );
}

export default App;
export const API_Endpoint = 'http://localhost:5500'
