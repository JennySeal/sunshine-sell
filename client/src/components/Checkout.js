import React, {useState} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { removeProductFromCart, selectCart } from "../slice_reducers/cartSlice";
import {CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import Payment from './Payment';
import Shipping from './Shipping'
import GetTotal from './GetTotal';

import './../styles/checkout.css'


const Checkout = () => {

    const deliveryCost = "2.50";
    const cart = useSelector(selectCart);
    const totalPrice = GetTotal(cart)
    let totalWithShipping = (parseFloat(totalPrice) + parseFloat(deliveryCost)).toFixed(2);
    const dispatch = useDispatch()

    const stripe = useStripe()
    const elements = useElements()
    const [isPaymentLoading, setPaymentLoading] = useState(false);
    const [checkoutConfirmed, setCheckoutConfirmed] = useState(false);


      const removeItem = (cartItem) => {
        dispatch(removeProductFromCart(cartItem));
      };
    
      const showPayment = (e) => {
        e.preventDefault()
        setCheckoutConfirmed(!checkoutConfirmed)
      }

    const clientSecret = 'secretkey'
    const payMoney = async(e) => {
    e.preventDefault();
    if (!stripe || !elements) {
        return;
    }
    setPaymentLoading(true);
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
                name: 'Toffy Seal'
            },
        },
    })
    setPaymentLoading(false);
    if (paymentResult.error) {
        console.log(paymentResult.error.message) 
        alert(paymentResult.error.message)
    } else {
        console.log(paymentResult.token)
    }
    }
    

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
                
        <form action='/create-checkout-session' method='POST'><button type='submit' onSubmit={showPayment}>Confirm Checkout</button></form>

        {checkoutConfirmed && <div id='payment'>        <form onSubmit={payMoney}>
         <h3>Payment Details</h3>
        <p>To pay for your eco-friendly Sunshine products please complete your payment details below:</p>
        <p>For testing purposes use this card number: <span className='boldOrange'>4242 4242 4242 4242</span> with any 3 digits for CVC and a future date.</p>
        <div className='cardpayment'>
                <Payment amount="62.99" name='STRIPE_INTEGRATION' description ='Order of Sunshine Store products'/>
                <button disabled={isPaymentLoading}>Buy Now</button>
                </div>
                </form>
                </div>
                }
                </div>

    )
}

export default Checkout
