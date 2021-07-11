import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';


import './styles/App.css';

import Header from './components/Header';
import Login from './components/Login';
import Cart from './components/Cart';
import Products from './components/Products';
import ProductItem from './components/ProductItem';
import Footer from './components/Footer';
import FourOhFour from './components/FourOhFour';

import { useSelector, useDispatch } from 'react-redux';
import { selectCart } from './slice_reducers/cartSlice';
import { selectCustomer, loggedOutOfCustomerDb, talkingToCustomerDbFailed } from './slice_reducers/customerSlice';

const axios = require('axios');

const App = () => {
  
  const dispatch = useDispatch();

  const cart = useSelector(selectCart)
  const cartCounter = cart.length;
  const customerInfo = useSelector(selectCustomer);
  const loggedIndicator = customerInfo.isLoggedin;

  const logoutOfDb = async() => { 
    console.log('hello2')
    try {
    const response = await axios.get(`${API_Endpoint}/logout`)
    console.log('hello2')
    if (response.status === 200) {
    dispatch(loggedOutOfCustomerDb(response.data))    
}}
    catch (error) {
    dispatch(talkingToCustomerDbFailed)
};
};


  const logout = (e) => {
    e.preventDefault()
    console.log('hello1')
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
