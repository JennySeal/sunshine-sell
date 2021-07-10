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
            <br/><Link to='/'>Keep Shopping</Link> 
        </div>
    )
}

export default LoggedIn;