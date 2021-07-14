import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

import { useSelector, useDispatch } from "react-redux";
import { removeProductFromCart, selectCart } from "../slice_reducers/cartSlice";
import { selectCustomer } from "../slice_reducers/customerSlice";
import API_Endpoint from '../config/server';
import PublicStripeKey from '../config/stripe';

import Shipping from './Shipping'
import GetTotal from './GetTotal';

import './../styles/checkout.css'

const axios = require('axios');

const Checkout = () => {
  
  const dispatch = useDispatch()
  const currency = 'GBP';
  const poundToPenny = (amount) => {
    return parseInt(amount * 100)
  }


  const deliveryCost = "2.50";
  const cart = useSelector(selectCart);
  const customer = useSelector(selectCustomer)
  const customerDetails = customer.data;
  const totalPrice = GetTotal(cart)
  let totalWithShipping = (parseFloat(totalPrice) + parseFloat(deliveryCost)).toFixed(2);

const removeItem = (cartItem) => {
  dispatch(removeProductFromCart(cartItem));
    };
const successPayment = data => {
    alert('Payment successful!')
  }

  const failedPayment = data => {
    alert('Payment failed.')
  }

  const onToken = (amount, description) => token =>  
      axios.post(`${API_Endpoint}/takepayment`, {
      description: 'Sunshine Stores products',
      source: token.id,
      currency,
      amount: poundToPenny(totalWithShipping), 
    })
  .then(successPayment)
  .catch(failedPayment)

    

    

    return (
        <div className='checkout' >
            <div className='inlineflex'>
                <div className='columnflex'>
                    <h3>Order Summary</h3>
                    <div id="cartLayout">
                    <div className="total_cost">
                          <p>The cost of the eco-items in your shopping basket is <span className='boldOrange'>£{totalPrice}</span>.</p>
                          <p>The delivery costs for shipping is <span className='boldOrange'>£{deliveryCost}</span>.</p>   
                          <p>The total cost is <span className='boldOrange'>£{totalWithShipping}</span>.</p>  
                            
                        </div>
                    <div className="cart_container">
                        {cart.map((cartItem) => (
                          <div key={cartItem.product_id} className="inlineflexCheckout">
                          
                            <img src={cartItem.image} alt={cartItem.name} />
                            <div className='columnflex'>
                            <p>price: {cartItem.cost_per_item}</p>
                            <button type="button" id='removeCheckout' onClick={() => {removeItem(cartItem);}}>Remove</button>
                            </div>
                            </div>
                            
                        ))}
                      </div>
                          
                        </div>
                </div>
                <div className='columnflex'>
                    <h3>Delivery</h3>
                    <Shipping />
                </div>
                </div>
                

         <h3>Payment Details</h3>
        <p>To pay for your eco-friendly Sunshine products please complete your payment details below:</p>
        <p>For testing purposes use this card number: <span className='boldOrange'>4242 4242 4242 4242</span> with any 3 digits for CVC and a future date.</p>
        <StripeCheckout 
          name='Sunshine-Stores'
          description={cart[0].name}
          amount={poundToPenny(totalWithShipping)}
          token={onToken(poundToPenny(totalWithShipping), 'Eco-products')}
          currency={currency}
          stripeKey={PublicStripeKey}
          zipCode={false}
          email={customerDetails.email}
          allowRememberMe={false} /> 
          </div>
                

    )
}

export default Checkout
