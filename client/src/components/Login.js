import React from 'react';
import './../styles/login.css';
import {useDispatch, useSelector} from 'react-redux';
import {talkingToCustomerDb, talkedToCustomerDb, talkingToCustomerDbFailed, selectCustomer} from './../slice_reducers/customerSlice';
import Products from '../components/Products';
import UseForm from './UseForm';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';


import API_Endpoint from './../config/server';
import {Link, useLocation} from 'react-router-dom';
import Checkout from '../components/Checkout';

const stripePromise = loadStripe('pk_test_51JCKsaGHGV93t4GrPTQd9yp3q1oMsZ9dbolIoS5OXQcO3u46Eh1pZatSFHH6iR7l6Gk6i4kiPLtenChOxBCVHYlK00V3I8acpe');

const axios = require('axios');

const Login = () => {
    const dispatch = useDispatch();
    const location = useLocation()
    const fromCart = location.state?.fromCart;

    const customerState = useSelector(selectCustomer);
    const showLoggedInForm = customerState.isLoggedin;
    const failedToLogIn = customerState.isError;

    const [values, handleChange] = UseForm({username:"", password:""});


    const getCustomerDetails = (async (values) => {
            try {
            dispatch(talkingToCustomerDb)
            const {username, password} = values;
                
        const response = await axios.post(`${API_Endpoint}/login`, ({
            username: username, 
            password: password}))
            if (response.status === 201) { 
            dispatch(talkedToCustomerDb(response.data)) }
            else {
            dispatch(talkingToCustomerDbFailed(response.data))
            }
            values.username = "";
            values.password = "";
            
    }
        catch (error) {
        dispatch(talkingToCustomerDbFailed)
        };
});

    const login = (e) => {
        e.preventDefault()
        getCustomerDetails(values);
       }

    return (
        <div>
        {!showLoggedInForm && <div className="pageContainer" id='loginForm'>
        Please log in to your Sunshine Stores account.<br/>
        <form>
            Username: <input type="username" id="username" name="username" value={values.username} placeholder="" onChange={handleChange} required/> <br/>
            Password:&nbsp; <input type="text" id="password" name="password" value={values.password} placeholder="" onChange={handleChange} required/> 
            <button type="submit" value="Log in" onClick={login}>Log In</button><br/>
        </form>
        {failedToLogIn && <h4>Sorry! Your email or username is incorrect</h4>}<br/>
        <p>Or register as a new customer of Sunshine Stores.</p>  
        <Link to="/register" className='boldOrange'>Register as a New Customer</Link>
        </div>}
        {showLoggedInForm && !fromCart && <Products />}
        {showLoggedInForm && fromCart && 
            <Elements stripe={stripePromise}><Checkout /></Elements>}
        </div>
    )
}

export default Login
