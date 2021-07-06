import React from "react";
import { useSelector} from "react-redux";
import {selectCart } from "../slice_reducers/cartSlice";
import "./../styles/cart.css";

const Cart = () => {
  const cart = useSelector(selectCart);
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
  


  return (
        <div>
        <div className="cart_container">
        {cart.map((cartItem) => (
          <div key={cartItem.product_id} className="cart_item">
              <img src={cartItem.image} alt={cartItem.name} />
              <h4>{cartItem.name}</h4>
              <p>price: {cartItem.cost_per_item}</p>
              </div>))} 
      
      </div>
      <p id="total_cost">Total cost of items: £{totalPrice}</p>
      </div>
  );
};

export default Cart;
