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

import { useSelector } from 'react-redux';
import { selectCart } from './slice_reducers/cartSlice';
import { selectLogin } from './slice_reducers/loginSlice';


const App = () => {

  const cart = useSelector(selectCart)
    const cartCounter = cart.length;
  const loggedIn = useSelector(selectLogin);
  console.log(loggedIn)
    const loggedIndicator = loggedIn.isLoggedin;
    console.log(loggedIndicator)

  return (
    <Router>
      <div id="mainContainer">
      <Header/>
      <nav>
      <Link to="/"><img src="images/homeIcon.png" alt="Homepage Icon" id="homepageIcon"/></Link>
            <Link to="/cart"><img src="images/shoppingBagIcon.png" alt="Shopping Bag Icon for Cart" id="shoppingBag"/><span id="cartCounter">{cartCounter}</span></Link>
            <Link to="/login">{!loggedIndicator ? <p>Log In / Register</p> : <p>Hello {loggedIn.data.data.first_name}</p>}</Link>
  
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
