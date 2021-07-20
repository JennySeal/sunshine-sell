import React, {useState} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import {removeProductFromCart, selectCart } from "../slice_reducers/cartSlice";
import { selectCustomer } from "../slice_reducers/customerSlice";
import API_Endpoint from '../config/server';
import PublicStripeKey from '../config/stripe';
import Logo from './../logo.png'

import Shipping from './Shipping'
import GetTotal from './GetTotal';

import './../styles/checkout.css'

const axios = require('axios');

const Checkout = () => {
  
  const dispatch = useDispatch()
  const [paid, setPaid] = useState(false)


  const currency = 'GBP';
  const poundToPenny = (amount) => {
    return parseInt(amount * 100)
  }

  const deliveryCost = "2.50";
  const cart = useSelector(selectCart);
  const customer = useSelector(selectCustomer)
  const customerDetails = customer.data;
  const customer_id = customerDetails.customer_id;
  const totalPrice = GetTotal(cart)
  let totalWithShipping = (parseFloat(totalPrice) + parseFloat(deliveryCost)).toFixed(2);


const removeItem = (cartItem) => {
  dispatch(removeProductFromCart(cartItem));
    };


  const failedPayment = data => {
    console.log(data)
  }

  const onToken = ((amount, description, e) => token => { 
      axios.post(`${API_Endpoint}/takepayment`, {
      description: 'Sunshine Stores products',
      source: token.id,
      currency,
      amount: poundToPenny(totalWithShipping), 
    }).then(
    oncePaid())
    .catch(failedPayment)
  }
    )

     
  const oncePaid = () => {
    const date = new Date()
    const payload = {
      total_spent: totalWithShipping,
      customer_id: customer_id,
      date_of_order: date,
      status: 'paid'
    }
    axios.post(`${API_Endpoint}/order`, (payload))
    .then(data=> {
      console.log(data)
      const length = Object.keys(cart).length
      console.log(length)
      console.log(cart)
      let payload_orderlines;
  
      for (let i=0; i<length; i++) {
        payload_orderlines = {
            order_line_id: `${parseInt(data.data)}-${cart[i].product_id}`,
            order_id: parseInt(data.data),
            product_id: cart[i].product_id,
            quantity: 1,
            customer_id: customer_id
        }
        console.log(payload_orderlines)
        axios.post(`${API_Endpoint}/orderlines`, (payload_orderlines))
        axios.put(`${API_Endpoint}/updatestock`, ({product_id: cart[i].product_id}))
}        setPaid(!paid)
         })}


    return (
        <div className='pageContainer' id='checkoutContainer'>
                
                    {paid && <p className='boldOrange'>Thank you very much for your order.</p>}
                    {paid && <Link to='/account'><button>View Order History</button></Link>}
                    {!paid && <div className='columnflex' id='orderDetails'><h3>Order Summary</h3>
                          <p>The cost of the eco-items in your shopping basket is <span className='boldOrange'>£{totalPrice}</span>.</p>
                          <p>The delivery costs for shipping is <span className='boldOrange'>£{deliveryCost}</span>.</p>   
                          <p>The total cost is <span className='boldOrange'>£{totalWithShipping}</span>.</p>  
                    <div className="rowFlex">
                        {cart.map((cartItem) => (
                          <div key={cartItem.product_id} className="card" id='cartItem'>
                          
                            <img src={cartItem.image} alt={cartItem.name} />
                            <div className='columnflex'>
                            <p>price: {cartItem.cost_per_item}</p>
                            <button type="button" id='removeCheckout' onClick={() => {removeItem(cartItem);}}>Remove</button>
                            </div>
                            </div>                   
                        ))}
                      </div>
                      </div>}
                
                
         {!paid && <div>                 
         <h3>Payment Details</h3>
        <p>To pay for your eco-friendly Sunshine products please complete your payment details below:</p>
        <p>For testing purposes use this card number: <span className='boldOrange'>4242 4242 4242 4242</span> with any 3 digits for CVC and a future date.</p>
        <StripeCheckout 
          name='Sunshine-Stores'
          image={Logo}
          description={`Sunshine Stores Eco-Products`}
          amount={poundToPenny(totalWithShipping)}
          token={onToken(poundToPenny(totalWithShipping), 'Eco-products')}
          currency={currency}
          stripeKey={PublicStripeKey}
          zipCode={false}
          email={customerDetails.email}
          allowRememberMe={false}
          >
          <button className='btn'>Pay Now</button>
          </StripeCheckout>
          <h3>Delivery</h3>
          <Shipping />
          </div>}
          </div>
    )
}

export default Checkout
