import React from 'react'
import { useLocation } from 'react-router-dom'

const FourOhFour = () => {

    let location = useLocation();

    return (
        <div>
        <h3>Oh dear! How did we end up here?</h3>
        <p>I'm sorry to say there is no such place as {location.pathname}!</p>            
        </div>
    )
}

export default FourOhFour;