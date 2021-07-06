import React from 'react';
import Logo from './../logo.png';
import './../styles/header.css';

const LoadingIcon = () => {
    return (
        <div id="LoadingIcon">
        <p>Testing, testing, one, two, three! <br/>Sorry you are waiting</p>
        <div className="App-logo">
        <img className="loadingIcon" src={Logo} alt="Cool Spinning Logo"/> 
        </div>
        </div>
    )
}

export default LoadingIcon
