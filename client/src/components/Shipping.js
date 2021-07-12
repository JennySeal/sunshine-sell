import React from 'react';
import { useSelector } from 'react-redux';
import { selectCustomer } from './../slice_reducers/customerSlice';


const Shipping = () => {

    const customerDetails = useSelector(selectCustomer)
    const customerData = customerDetails.data;

    console.log(customerData)

    return (
        <div id='shipping'>
        <p>Your shipping address is:</p>
        {customerData ? 
            <div>
            <p>{customerData.first_name} {customerData.surname},<br/>
            {customerData.address_line1},<br/>
            {customerData.address_line2},<br/>
            {customerData.town},<br/>
            {customerData.county},<br/>            
            {customerData.postcode}<br/>
            </p>
            </div>
         : 
            <p>Who knows? You aren't logged in!</p>
        }
        </div>
    )
}

export default Shipping
