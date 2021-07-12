import { CardElement } from "@stripe/react-stripe-js";

import React from 'react'

const paymentOptions = {
    iconStyle: "solid",
    hidePostalCode: true,
  style: {
    base: {
      iconColor: "orangered",
      color: "darkslateblue",
      fontSize: "16px",
      fontFamily: '"Lato", sans-serif',
      "::placeholder": {
        color: "darkslateblue"
      }
    },
    invalid: {
      color: "#e5424d",
      ":focus": {
        color: "#303238"
      }
    }
}
}

const Payment = () => {
    return (
        <div id='formContainer'>
            <CardElement options={paymentOptions} />
            
        </div>
    )
}

export default Payment;

