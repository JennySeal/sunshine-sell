import React, {useCallback, useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {selectCustomer} from './../slice_reducers/customerSlice';
import './../styles/account.css'

import Shipping  from './Shipping'
import API_Endpoint from '../config/server';
import { emptyCartForSale } from '../slice_reducers/cartSlice';

const axios = require('axios')

const Account = () => {

    const customer = useSelector(selectCustomer);
    const [gotOrders, setGotOrders] = useState(false)
    const [orders, setOrders] = useState([])
    const dispatch = useDispatch()

    const getOrderHistory = useCallback(() => {
        dispatch(emptyCartForSale())
        axios.get(`${API_Endpoint}/orderhistory/${customer.data.customer_id}`).then(data => {
        setOrders(data.data.reverse())
        setGotOrders(true)
       }).catch(() => {
        })}, [customer.data.customer_id, dispatch])

    useEffect(() => {
        getOrderHistory()},[getOrderHistory])

        
    return (
        <div className='pageContainer' id='account'>
        <div className='columnflex'>
        <h4>Order history</h4>
            <br/>
            {!gotOrders ? <p>You have not ordered from Sunshine Stores before.</p> : 
                orders.map((order) =>
                    <div key={order.order_line_id} className='rowFlex' id='orderHistory'>
                    <h4>{new Date(order.date_of_order).toISOString().slice(0, 10)}</h4> 
                    <p>{order.name} - Price: {order.price}</p>
                    <img src={order.image} alt={order.name} className="orderImg" />
                    </div>)}
                    </div>
            <Shipping/>
        </div>
    )
}

export default Account
