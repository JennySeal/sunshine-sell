import React from 'react';
import './../styles/login.css';
import {useDispatch, useSelector} from 'react-redux';
import {talkingToCustomerDb, talkedToCustomerDb, talkingToCustomerDbFailed, selectCustomer} from './../slice_reducers/customerSlice';
import LoggedIn from '../components/LoggedIn';
import UseForm from './UseForm';
import { API_Endpoint } from '../App';
import {Link} from 'react-router-dom';
const axios = require('axios');

const Login = () => {
    const dispatch = useDispatch();

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
            console.log(response.status)
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
        <div id="formContainer">
        {!showLoggedInForm && <div id="loginForm">
        Please log in to your Sunshine Stores account.<br/>
        <form>
            Username: <input type="username" id="username" name="username" value={values.username} placeholder="" onChange={handleChange} required/> <br/>
            Password:&nbsp; <input type="text" id="password" name="password" value={values.password} placeholder="" onChange={handleChange} required/> 
            <input type="submit" id="submit" value="Log in" onClick={login}/><br/>
        </form>
        {failedToLogIn && <h3>Sorry! Your email or username is incorrect</h3>}
        <p>Or register as a new customer of Sunshine Stores.</p>  
        <Link to="/register">Register as a New Customer</Link>
        </div>}
        {showLoggedInForm && <LoggedIn />}
        </div>
    )
}

export default Login
