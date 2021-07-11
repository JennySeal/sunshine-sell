import React from 'react'
import { useSelector} from "react-redux";
import {selectCustomer } from "../slice_reducers/customerSlice";
import {Link} from 'react-router-dom';

const LoggedIn = () => {

    const customerDetails = useSelector(selectCustomer);
    console.log(customerDetails);

    return (
        <div>
            Thanks for logging in {customerDetails.data.first_name}. 
            <br/><div id="checkoutLinks"><Link to='/'>Keep Shopping</Link><Link to='/login'>Checkout</Link><Link to='/cart'>View Cart</Link></div>
        </div>
    )
}

export default LoggedIn;