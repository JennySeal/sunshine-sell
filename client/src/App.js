import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { selectCustomer } from "./slice_reducers/customerSlice";
import { useSelector } from "react-redux";

import "./styles/Index.css";

import Header from "./components/Header";
import Nav from "./components/Nav";
import Login from "./components/Login";
import Cart from "./components/Cart";
import Products from "./components/Products";
import ProductItem from "./components/ProductItem";
import Checkout from "./components/Checkout";
import Account from "./components/Account";
import Footer from "./components/Footer";
import FourOhFour from "./components/FourOhFour";
import Register from "./components/Register";


const App = () => {


console.log('Hello, if you like this site and would like to know more, my website is www.jennyseal.com')

const customerDetails = useSelector(selectCustomer);
const customerLoggedIn = customerDetails.isLoggedin;


   return (
    <Router>
      <div id="mainContainer">
        <Header />
        <Nav />
        <div className="innerContainer">
          <Switch>
            <Route exact path="/">
              <Products />
            </Route>

            <Route path="/cart">
              <Cart />
            </Route>

            <Route path="/login">
              <Login />
            </Route>

            <Route path="/products/:id">
              <ProductItem />
            </Route>

            <Route path="/register">
              <div id="formContainer">
                <Register />
              </div>
            </Route>

            <Route path="/checkout">
                <Checkout/>
            </Route>

            <Route path="/account">
            {customerLoggedIn ? <Account/> : <Redirect to='/' />}
            </Route>
  
            <Route path="/*">
              <FourOhFour />
            </Route>
          </Switch>
         
        </div>
        <Footer />
      </div>
    </Router>
  );
};


export default App;
