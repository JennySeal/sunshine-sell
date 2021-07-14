import React from 'react'
import { Link } from 'react-router-dom'
import './../styles/FourOhFour.css'

const FourOhFour = () => {

    let location = window.location.href;

    return (
        <div className="pageContainer">
        <h2 className='FourOhFour'>4-Oh-4</h2>
        <h3>Oh dear! How did we end up here?</h3>
        <p>I'm sorry to say there is no such place as {location}!</p>  
        <Link to="/">Let's get you back home</Link>
        </div>
    )
}

export default FourOhFour;