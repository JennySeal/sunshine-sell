import React from 'react'

import './../styles/account.css'
import Shipping  from './Shipping'

const Account = () => {
        

    return (
        <div id='account'>
            <h4>Order history</h4>
            <p>You have not ordered from Sunshine Stores before.</p> 
            <Shipping/>
        </div>
    )
}

export default Account
