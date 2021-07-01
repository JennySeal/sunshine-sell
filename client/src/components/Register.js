import React, {useState} from 'react'
import UseForm from './UseForm';

const Register = () => {

    const [passwordMatch, setPasswordMatch] = useState('false');
    const [values, setValues] = UseForm({email:"", inputPassword:"", inputPasswordTwo:"", first_name:"", surname:"", address_line1:"", address_line2:"",
    town:"", county:"", postcode:""});


    const checkPasswordMatch = (e) => {
        e.preventDefault();
        console.log({passwordMatch}, {values});
    if (values.inputPassword === values.inputPasswordTwo) setPasswordMatch(true); 
    }


    return (
        <div>
        {(!passwordMatch) ?         
            <div>
            <p>Please enter your registration details.</p><br/>
         <form onInput={setValues} >
            <div id="formfield">Email address: <input type="email" id="email" name="email" maxLength="50" value={values.email} required/></div> <br/>
            <div id="formfield">Password: <input type="text" id="inputPassword" name="inputPassword" minLength="8" value={values.inputPassword} required/></div><br/>
            <div id="formfield">Re-enter Password: <input type="text" id="inputPasswordTwo" name="inputPasswordTwo" minLength="8" value={values.inputPasswordTwo} required/></div><br/>
            <div id="formfield">First Name: <input type="text" name='first_name' id="capitalize" maxLength="20" value={values.first_name} required/></div><br/>
            <div id="formfield">Surname: <input type="text" name='surname' maxLength="20" id="capitalize" value={values.surname} required/></div><br/>
            <div id="formfield">Address Line 1: <input type="text" name="address_line1" maxLength="50" id="capitalize" value={values.address_line1} required/></div><br/>
            <div id="formfield">Address Line 2: <input type="text" name="address_line2" maxLength="50" id="capitalize" value={values.address_line2}/></div><br/>
            <div id="formfield">Town/City: <input type="text" name="town" maxLength="20" id="capitalize" value={values.town} required/></div><br/>
            <div id="formfield">County: <input type="text" name="county" maxLength="20" id="capitalize" value={values.county}/></div><br/>
            <div id="formfield">Postcode: <input type="text" id="uppercase" name="postcode" maxLength="50" value={values.postcode} required/></div><br/>
 
            <input type="submit" id="submit" value="Register" onClick={checkPasswordMatch}/><br/>
        </form></div> : <div>
        <p>Thank you very much for registering with Sunshine Stores!</p>
        <a href="/cart">Proceed to Cart</a><br/>
        <a href="/">Keep Shopping</a>
        </div>}
        </div>
    )
}

export default Register
