import React, {useCallback, useState} from 'react'
import UseForm from './UseForm';
import { useDispatch } from 'react-redux';
import {addingCustomerToDb, addedCustomerToDb, addCustomerToDbFailed} from './../slice_reducers/customerSlice';
const axios = require('axios');

const API_Endpoint = 'http://localhost:5500'

const Register = () => {
    const dispatch = useDispatch();
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [values, handleChange] = UseForm({first_name:"", surname:"", username:"", email:"", saltyhash:"", address_line1:"", address_line2:"",
    town:"", county:"", postcode:"", inputPasswordTwo:""});
    

    const addCustomerToDatabase = useCallback(({values}) => {
        dispatch(addingCustomerToDb);
        const {first_name, surname, email, saltyhash, address_line1, address_line2, town, county, postcode} = values;

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
        dispatch(addedCustomerToDb(payload))
        })
          .catch(() => { 
                dispatch(addCustomerToDbFailed)
            })},[dispatch])
    
      

    const checkPasswordMatch = (e) => {
        e.preventDefault();
        const passwordOne = values.saltyhash;
        const passwordTwo = values.inputPasswordTwo;
    if (passwordOne === passwordTwo) {
        setPasswordMatch(true);
        addCustomerToDatabase({values}) 
    }
    }




    return (
        <div>
        {(!passwordMatch) ?         
            <div>
            <p>Please enter your registration details.</p><br/>
         <form >
            <div id="formfield">Email address: <input type="email" id="email" name="email" maxLength="50" value={values.email} onChange={handleChange} required/></div> <br/>
            <div id="formfield">Password: <input type="text" name="saltyhash" minLength="8" value={values.saltyhash} onChange={handleChange} required/></div><br/>
            <div id="formfield">Re-enter Password: <input type="text" name="inputPasswordTwo" minLength="8" value={values.inputPasswordTwo} onChange={handleChange} required/></div><br/>
            <div id="formfield">First Name: <input type="text" name='first_name' id="capitalize" maxLength="20" value={values.first_name} onChange={handleChange} required/></div><br/>
            <div id="formfield">Surname: <input type="text" name='surname' maxLength="20" id="capitalize" value={values.surname} onChange={handleChange} required/></div><br/>
            <div id="formfield">Address Line 1: <input type="text" name="address_line1" maxLength="50" id="capitalize" value={values.address_line1} onChange={handleChange} required/></div><br/>
            <div id="formfield">Address Line 2: <input type="text" name="address_line2" maxLength="50" id="capitalize" value={values.address_line2} onChange={handleChange}/></div><br/>
            <div id="formfield">Town/City: <input type="text" name="town" maxLength="20" id="capitalize" value={values.town} onChange={handleChange} required/></div><br/>
            <div id="formfield">County: <input type="text" name="county" maxLength="20" id="capitalize" value={values.county} onChange={handleChange}/></div><br/>
            <div id="formfield">Postcode: <input type="text" id="uppercase" name="postcode" maxLength="50" value={values.postcode} onChange={handleChange} required/></div><br/>
 
            <input type="submit" id="submit" value="Register" onClick={checkPasswordMatch}/><br/>
        </form></div> : <div>
        <p>Thank you very much for registering with Sunshine Stores {values.first_name}!</p>
        <a href="/cart">Proceed to Cart</a><br/>
        <a href="/">Keep Shopping</a>
        </div>}
        </div>
    )
}

export default Register;
