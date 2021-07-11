import React, {useState} from 'react';
import './../styles/login.css';
import Register from '../components/Register';
import {useDispatch, useSelector} from 'react-redux';
import {talkingToCustomerDb, talkedToCustomerDb, talkingToCustomerDbFailed, selectCustomer} from './../slice_reducers/customerSlice';
import LoggedIn from '../components/LoggedIn';
import UseForm from './UseForm';
import { API_Endpoint } from '../App';
const axios = require('axios');

const Login = () => {
    const dispatch = useDispatch();

    const [showRegForm, setShowRegForm] = useState(false);
    const [showLogInForm, setShowLogInForm] = useState(true);

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


    const toggleForms = () => {
        setShowRegForm(!showRegForm);
        setShowLogInForm(!showLogInForm);
    }

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
        <p>Or register as a new customer of Sunshine Stores.  
        <button type="submit" value="register" onClick={toggleForms}>New Customer</button></p>
        </div>}
        {showRegForm && <Register/>}
        {showLoggedInForm && <LoggedIn />}
        </div>
    )
}

export default Login
