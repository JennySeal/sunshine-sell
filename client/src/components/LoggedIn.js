import React from 'react'
import { useSelector} from "react-redux";
import {selectCustomer } from "../slice_reducers/customerSlice";
import {selectCart} from "../slice_reducers/cartSlice";
import {Link} from 'react-router-dom';

const LoggedIn = () => {

    const customerDetails = useSelector(selectCustomer);
    const cart = useSelector(selectCart);

    return (
        <div id='account'>
            <p>Thank you for logging in {customerDetails.data.first_name}. </p> 
            <div className="checkoutLinks"><Link to='/'><button>Keep Shopping</button></Link>
            {(cart.length > 0) && <Link to='/checkout'>Checkout</Link>}</div> 
        </div>
    )
}

export default LoggedIn;