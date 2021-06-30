import React from 'react'

const Register = () => {
    return (
        <div>
        Please enter your registration details.<br/>
        <form>
            <div id="formfield"><label>Email address: </label><input type="email" id="email" name="email" maxLength="50" required/></div> <br/>
            <label>Password: </label><input type="text" id="password" minLength="8" required/><br/>
            Re-enter password: <input type="text" id="password" required/> <br/><br></br>
            First Name: <input type="text" name='first_name' id="capitalize" maxLength="20" required/><br/>
            Surname: <input type="text" name='surname' maxLength="20" id="capitalize" required/><br/>
            Address Line 1: <input type="text" name="address_line1" maxLength="50" id="capitalize" required/><br/>
            Address Line 2: <input type="text" name="address_line2" maxLength="50" id="capitalize"/><br/>
            Town/City: <input type="text" name="town" maxLength="20" id="capitalize" required/><br/>
            County: <input type="text" name="county" maxLength="20" id="capitalize"/><br/>
            Postcode: <input type="text" id="uppercase" name="postcode" maxLength="50" required/><br/>
 
            <input type="submit" id="submit" value="Register"/><br/>
        </form>
        </div>
    )
}

export default Register
