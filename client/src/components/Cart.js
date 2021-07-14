import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeProductFromCart, selectCart } from "../slice_reducers/cartSlice";
import { Link } from "react-router-dom";
import {selectCustomer} from '../slice_reducers/customerSlice';
import GetTotal from "./GetTotal";
import "./../styles/cart.css";

const Cart = () => {
  const cart = useSelector(selectCart);
  const customerDetails = useSelector(selectCustomer)
  const checkLogin = customerDetails.isLoggedin;    
  const dispatch = useDispatch();

  const totalPrice = GetTotal(cart)

  const removeItem = (cartItem) => {
    dispatch(removeProductFromCart(cartItem));
  };

  return (
    <div id="inlineflex">

    {(cart.length > 0) ? 
    <div id="cartLayout">
    <div className="total_cost">
          <p>The cost of the eco-items in your shopping basket is <span className='boldOrange'>£{totalPrice}</span>.<br/></p>
          <Link to="/"><button>Keep Shopping</button></Link>
          {!checkLogin ? <Link to={{pathname:'/login', state: {fromCart: true}}}><button >Checkout</button></Link> :
          <Link to='/checkout'><button>Checkout</button></Link>
        } 
        
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
            <div className="total_cost">
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
