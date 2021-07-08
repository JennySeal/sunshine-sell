import React, {useState} from 'react'
import './../styles/login.css';
import Register from '../components/Register';


const Login = () => {

    const [showRegForm, setShowRegForm] = useState(false);
    const [showLogInForm, setShowLogInForm] = useState(true);

    const toggleForms = () => {
        setShowRegForm(!showRegForm);
        setShowLogInForm(!showLogInForm);
    }

    return (
        <div id="formContainer">
        {showLogInForm && <div id="loginForm">
        Please log in to your Sunshine Stores account.<br/>
        <form>
            Username: <input type="text" id="username" /> <br/>
            Password:&nbsp; <input type="text" id="password" /> 
            <input type="submit" id="submit" value="Log In"/><br/>
        </form>
        <p>Or register as a new customer of Sunshine Stores.  
        <button onClick={toggleForms}>New Customer</button></p>
        </div>}
        {showRegForm && <Register/>}
        </div>
    )
}

export default Login
