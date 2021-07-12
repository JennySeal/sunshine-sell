import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeProductFromCart, selectCart } from "../slice_reducers/cartSlice";
import { Link } from "react-router-dom";
import {selectCustomer} from '../slice_reducers/customerSlice';
import {useLocation} from 'react-router-dom';

import "./../styles/cart.css";


const Cart = () => {
  const cart = useSelector(selectCart);
  const customerDetails = useSelector(selectCustomer)
  const checkLogin = customerDetails.isLoggedin;    
  const dispatch = useDispatch();

  let location = useLocation()
  console.log(location.pathname)
  let isCheckingOut = (location.pathname === '/checkout') ? true : false; 
  const deliveryCost = "2.50";

  const getTotal = () => {
    let total_cost = 0;
    cart.forEach((object) => {
      total_cost += parseFloat(object.price);
    });
    return total_cost;
  };
  let totalPrice = getTotal().toFixed(2);
  let totalWithShipping = parseFloat(totalPrice) + parseFloat(deliveryCost);
  

  const removeItem = (cartItem) => {
    dispatch(removeProductFromCart(cartItem));
  };

  return (
    <div>

    {(cart.length > 0) ? 
    <div id="cartLayout">
    <div className="total_cost">
          <p>The cost of the eco-items in your shopping basket is <span className='boldOrange'>£{totalPrice}</span>.<br/></p>
          {isCheckingOut && <p>The delivery costs for shipping to <span className='boldOrange'>{customerDetails.data.address_line1}</span> is <span className='boldOrange'>£{deliveryCost}</span>.</p>}   
          {isCheckingOut && <p>The total cost is <span className='boldOrange'>£{totalWithShipping}</span>.</p>}   
          {!isCheckingOut && <Link to="/"><button>Keep Shopping</button></Link>}
          {!isCheckingOut && checkLogin && <Link to='/checkout'><button>Checkout</button></Link>}
          {!isCheckingOut && !checkLogin && <Link to='/login'><button >Checkout</button></Link>} 
        
        </div>
    <div className="cart_container">
        {cart.map((cartItem) => (
          <div key={cartItem.product_id} className="cart_item">
            <img src={cartItem.image} alt={cartItem.name} />
            <h4>{cartItem.name}</h4>
            <p>price: {cartItem.cost_per_item}</p>
            <button type="button" onClick={() => {removeItem(cartItem);}}>Remove</button>
          </div>
        ))}
      </div>
          
        </div>

        :

        totalPrice === "0.00" && 
            <div id='formContainer'>
            <p id="getShopping">
                Oh no! There are no eco-items in your basket right now.
            </p>
            <p className="links">
              <Link to="/">Go to Shopping</Link>
            </p>
            </div>}     
</div>)
};

export default Cart;
