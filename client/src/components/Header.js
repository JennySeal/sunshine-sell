import React from 'react';
import './../styles/header.css';
import Logo from './../images/logo.png';

const Header = () => {
    return (
        <header>
        <div className="columnFlex">
        <h1>SUNSHINE STORES</h1>
            
        </div>
            <img src={Logo} className='App-logo' alt="Rotating sunshine icon"/>
          </header>
    )
};

export default Header
