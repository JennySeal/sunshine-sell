import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import "./styles/App.css";

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

const stripePromise = loadStripe(
  "pk_test_51JCKsaGHGV93t4GrPTQd9yp3q1oMsZ9dbolIoS5OXQcO3u46Eh1pZatSFHH6iR7l6Gk6i4kiPLtenChOxBCVHYlK00V3I8acpe"
);

const App = () => {
  
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
              <Elements stripe={stripePromise}>
                <Checkout/>
              </Elements>
            </Route>

            <Route path="/account">
              <Account />
            </Route>

            <Route path="/*">
              <FourOhFour />
            </Route>
          </Switch>
          <Footer />
        </div>
      </div>
    </Router>
  );
};


export default App;
export const API_Endpoint = "http://localhost:5500";
