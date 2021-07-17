import React from 'react'
import { Link } from 'react-router-dom'
import './../styles/FourOhFour.css'

const FourOhFour = () => {

    let location = window.location.href;

    return (
        <div className="pageContainer">
        <h2 className='FourOhFour'>4-Oh-4</h2>
        <div className='flexRow'>
        <h3>Oh dear! How did we end up here?</h3>
        I'm sorry to say there is no such place as {location}!<br/>  
        <Link to="/" className='boldOrange'>Let's get you back home</Link>
        </div>
        </div>
    )
}

export default FourOhFour;