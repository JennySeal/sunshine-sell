import React from 'react'

import Payment from './Payment';
import { CardElement } from '@stripe/react-stripe-js';
import Cart from './Cart';
import Shipping from './Shipping'
import './../styles/checkout.css'


const Checkout = () => {
    
    const handleSubmit = async event => {
        event.preventDefault()
        const {stripe, elements} = this.props;
        if (!stripe || !elements) {
            return
        }
    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);

    if (result.error) {
        console.log(result.error.message) 
    } else {
        console.log(result.token)
    }
    }
    

    return (
        <div id='checkout' >
            <div id='inlineflex'>
                <div className='columnflex'>
                    <h3>Order Summary</h3>
                    <Cart/>
                </div>
                <div className='columnflex'>
                    <h3>Delivery</h3>
                    <Shipping />
                </div>
        </div>
        <form onSubmit={handleSubmit}>
        <p>To pay for your eco-friendly Sunshine products please complete your payment details below:</p>
        <div id='cardpayment'>
                <Payment />
                <button>Buy Now</button>
                </div>
                </form>
                </div>
    )
}

export default Checkout
