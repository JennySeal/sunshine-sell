import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeProductFromCart, selectCart } from "../slice_reducers/cartSlice";
import { Link } from "react-router-dom";

import "./../styles/cart.css";

const Cart = () => {
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();

  const getTotal = () => {
    let total_cost = 0;
    cart.forEach((object) => {
      total_cost += parseFloat(object.price);
    });
    return total_cost;
  };
  let totalPrice = getTotal().toFixed(2);

  const removeItem = (cartItem) => {
    dispatch(removeProductFromCart(cartItem));
  };

  return (
    <div>
    <div id="cartLayout">
    <div className="cart_container">
        {cart.map((cartItem) => (
          <div key={cartItem.product_id} className="cart_item">
            <img src={cartItem.image} alt={cartItem.name} />
            <h4>{cartItem.name}</h4>
            <p>price: {cartItem.cost_per_item}</p>
            <button
              type="button"
              onClick={() => {
                removeItem(cartItem);
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      {totalPrice === "0.00" ? (
        <div>
          <p id="getShopping">
            Oh no! There are no eco-items in your basket right now.
          </p>
          <p className="links">
            <Link to="/">Go to Shopping</Link>
          </p>
        </div>
      ) : (
        <div id="total_cost">
          <p>
            The total cost of the eco-items in your shopping basket is £
            {totalPrice}.
          </p>
          <br/>
          <p className="links">
          <Link to="/">Keep Shopping</Link><br/>
          <Link to="/checkout">Checkout</Link>
        </p>
            </div>
      )}     
</div>
</div>
  );
};

export default Cart;
