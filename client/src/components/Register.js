import React, {useCallback, useState} from 'react'
import UseForm from './UseForm';
import { useDispatch } from 'react-redux';
import {talkingToCustomerDb, talkedToCustomerDb, talkingToCustomerDbFailed} from './../slice_reducers/customerSlice';
import API_Endpoint from './../config/server';
import { Link } from 'react-router-dom';
import './../styles/login.css';
const axios = require('axios');
const bcrypt = require('bcryptjs');

const Register = () => {
    const dispatch = useDispatch();
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [values, handleChange] = UseForm({first_name:"", surname:"", username:"", email:"", password:"", address_line1:"", address_line2:"",
    town:"", county:"", postcode:"", inputPasswordTwo:""});
    

    const addCustomerToDatabase = useCallback(({values}) => {
        dispatch(talkingToCustomerDb());
        const {first_name, surname, email, password, address_line1, address_line2, town, county, postcode} = values;
        const salt = bcrypt.genSaltSync(10);
        const saltyhash = bcrypt.hashSync(password, salt);
        
        const payload = {
        address_line1: address_line1,
        address_line2: address_line2,
        town: town,
        county: county,
        postcode: postcode,
        email: email, 
        saltyhash: saltyhash,
        username: email, 
        first_name: first_name,
        surname: surname,
        }

        axios.post(`${API_Endpoint}/users`, (payload))
          .then(data=> {
        dispatch(talkedToCustomerDb(data))
        })
          .catch(() => { 
                dispatch(talkingToCustomerDbFailed())
            })},[dispatch])
    
      

    const checkPasswordMatch = (e) => {
        e.preventDefault();
        const passwordOne = values.password;
        const passwordTwo = values.inputPasswordTwo;
    if (passwordOne === passwordTwo) {
        setPasswordMatch(true);
        addCustomerToDatabase({values}) 
    }
    }


    return (
        <div className='pageContainer'>
        {(!passwordMatch) ?         
            <div>
            <p className='boldOrange'>Please enter your registration details.</p><br/>
         <form>
            <div className="formfield">Email address: <input type="email" id="email" name="email" maxLength="50" value={values.email} onChange={handleChange} required/></div> <br/>
            <div className="formfield">Password: <input type="text" name="password" minLength="8" value={values.password} onChange={handleChange} required/></div><br/>
            <div className="formfield">Re-enter Password: <input type="text" name="inputPasswordTwo" minLength="8" value={values.inputPasswordTwo} onChange={handleChange} required/></div><br/>
            <div className="formfield">First Name: <input type="text" name='first_name' id="capitalize" maxLength="20" value={values.first_name} onChange={handleChange} required/></div><br/>
            <div className="formfield">Surname: <input type="text" name='surname' maxLength="20" id="capitalize" value={values.surname} onChange={handleChange} required/></div><br/>
            <div className="formfield">Address Line 1: <input type="text" name="address_line1" maxLength="50" id="capitalize" value={values.address_line1} onChange={handleChange} required/></div><br/>
            <div className="formfield">Address Line 2: <input type="text" name="address_line2" maxLength="50" id="capitalize" value={values.address_line2} onChange={handleChange}/></div><br/>
            <div className="formfield">Town/City: <input type="text" name="town" maxLength="20" id="capitalize" value={values.town} onChange={handleChange} required/></div><br/>
            <div className="formfield">County: <input type="text" name="county" maxLength="20" id="capitalize" value={values.county} onChange={handleChange}/></div><br/>
            <div className="formfield">Postcode: <input type="text" id="uppercase" name="postcode" maxLength="50" value={values.postcode} onChange={handleChange} required/></div><br/>
 
            <button type="submit" id="submit" value="Register" onClick={checkPasswordMatch}>Register</button><br/>
        </form></div> : <div>
        <p>Welcome {values.first_name}!</p>
        <p>Thank you very much for registering with Sunshine Stores. </p>
        <div className='inlineFlex'><Link to="/checkout"><button>Proceed to Checkout</button></Link>
        <Link to="/checkout"><button>Keep Shopping</button></Link></div>
        </div>}
        </div>
    )
}

export default Register;
