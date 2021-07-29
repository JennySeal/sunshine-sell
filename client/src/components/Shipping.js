import React from 'react';
import { useSelector } from 'react-redux';
import { selectCustomer } from './../slice_reducers/customerSlice';


const Shipping = () => {

    const customerDetails = useSelector(selectCustomer)
    const customerData = customerDetails.data;


    return (
        <div className='card' id='shipping'>
        <p>Your shipping address is:</p>
        {customerData ? 
            <div>
            <p>{customerData.first_name} {customerData.surname}</p>
            <p>{customerData.address_line1}</p>
            {customerData.address_line2 && <p>{customerData.address_line2}</p>}
            <p>{customerData.town}</p>
            <p>{customerData.county}</p>            
            <p>{customerData.postcode}</p>
            </div>
         : 
            <p>Who knows? You aren't logged in!</p>
        }
        </div>
    )
}

export default Shipping
