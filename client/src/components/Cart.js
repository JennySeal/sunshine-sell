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
    <div>

    {(cart.length > 0) ? 
    <div className='pageContainer' id='cartContainer'>
          <p>The cost of the eco-items in your shopping basket is <span className='boldOrange'>£{totalPrice}</span></p>.
          <div id='inlineFlex'><Link to="/"><button>Keep Shopping</button></Link>
          {!checkLogin ? <Link to={{pathname:'/login', state: {fromCart: true}}}><button >Checkout</button></Link> :
          <Link to='/checkout'><button>Checkout</button></Link>}</div>
         
        
    <div className='rowFlex'>
    
        {cart.map((cartItem) => (
          <div key={cartItem.product_id} className="card" id='cartItem'>
            <img src={cartItem.image} alt={cartItem.name} />
            <div id='productText'>
            <h4>{cartItem.name}</h4>
            <p>price: {cartItem.cost_per_item}</p>
            <button type="button" onClick={() => {removeItem(cartItem);}}>Remove</button>
            </div>
            </div>
        ))}
      </div>
          
        </div>

        :

        totalPrice === "0.00" && 
            <div>
            <p>
                Oh no! There are no eco-items in your basket right now.
            </p>  
              <Link to="/" className='boldOrange'>Start Shopping</Link>
            </div>}     
</div>)
};

export default Cart;
