import React, {useState} from 'react';
import './../styles/login.css';
import Register from '../components/Register';
import {useDispatch, useSelector} from 'react-redux';
import {getCustomerFromDb, gotCustomerFromDb, fetchingCustomerFromDbFailed, selectCustomer} from './../slice_reducers/customerSlice';
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

    const [values, handleChange] = UseForm({username:"", password:""});


    const getCustomerDetails = (async (values) => {
            try {
            dispatch(getCustomerFromDb)
            const {username, password} = values;
                
        const response = await axios.post(`${API_Endpoint}/login`, ({
            username: username, 
            password: password}))

            if (response.status === 201) {
            dispatch(gotCustomerFromDb(response.data))
        }}
        catch (error) {
        dispatch(fetchingCustomerFromDbFailed)
        };
});


    const toggleForms = () => {
        setShowRegForm(!showRegForm);
        setShowLogInForm(!showLogInForm);
    }

    const login = (e) => {
        console.log('got here')
        e.preventDefault()
        getCustomerDetails(values);
       }

    return (
        <div id="formContainer">
        {!showLoggedInForm && <div id="loginForm">
        Please log in to your Sunshine Stores account.<br/>
        <form>
            Username: <input type="username" id="username" name="username" value={values.username} onChange={handleChange} required/> <br/>
            Password:&nbsp; <input type="text" id="password" name="password" value={values.password} onChange={handleChange} required/> 
            <input type="submit" id="submit" value="Log in" onClick={login}/><br/>
        </form>
        <p>Or register as a new customer of Sunshine Stores.  
        <button type="submit" value="register" onClick={toggleForms}>New Customer</button></p>
        </div>}
        {showRegForm && <Register/>}
        {showLoggedInForm && <LoggedIn />}
        </div>
    )
}

export default Login
