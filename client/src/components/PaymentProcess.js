import React from 'react'
import {ElementsConsumer} from '@stripe/react-stripe-js';
import Checkout from './Checkout';

const PaymentProcess = () => {

    return (
        <ElementsConsumer>
         {({stripe, elements}) => (
            <Checkout stripe={stripe} elements={elements} />)}
        </ElementsConsumer>
    )
}



export default PaymentProcess;