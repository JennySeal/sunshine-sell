import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import './styles/App.css';

import Header from './components/Header';
import Login from './components/Login';
import Cart from './components/Cart';
import Products from './components/Products';
import Footer from './components/Footer';
import FourOhFour from './components/FourOhFour';

import CartIcon from './images/shoppingBagIcon.png';


const App = () => {
  return (
    <Router>
      <div id="mainContainer">
        <Header/>
            <nav>
            <Link to="/"><h2>The Eco-Friendly E-Commerce Store</h2></Link>
            <Link to="/cart"><img src={CartIcon} alt="Shopping Bag Icon for Cart" id="shoppingBag"/></Link>
            <Link to="/login">Log In / Register</Link>
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
