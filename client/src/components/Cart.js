import React from "react";
import { useSelector, useDispatch} from "react-redux";
import {removeProductFromCart, selectCart } from "../slice_reducers/cartSlice";


import "./../styles/cart.css";

const Cart = () => {
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();

  console.log(cart)

  const getTotal = () => { 
      let total_cost = 0;
      cart.forEach(object => {
          total_cost += parseFloat(object.price)
      })
          return total_cost;    
}
  const totalPrice = getTotal().toFixed(2);
  console.log(cart)
  
const removeItem = (cartItem) => {
  dispatch(removeProductFromCart(cartItem))
}

  return (
        <div>
        <div className="cart_container">
        {cart.map((cartItem) => (
          <div key={cartItem.product_id} className="cart_item">
              <img src={cartItem.image} alt={cartItem.name} />
              <h4>{cartItem.name}</h4>
              <p>price: {cartItem.cost_per_item}</p>
              <button type="button" onClick={() => {removeItem(cartItem)}}>Remove</button>
              </div>))} 
      
      </div>
      {(totalPrice === 0.00)  && <p>There is nothing in your basket right now.</p>}
      <p id="total_cost">Total cost of items: £{totalPrice}</p>
      </div>
  );
};

export default Cart;
