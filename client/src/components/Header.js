import React from 'react';
import './../styles/header.css';

const Header = () => {
    
    return (
        <header>
        <div className="columnFlex">
        <h1>SUNSHINE STORES</h1>
        <h2>Eco-Friendly E-Commerce</h2>
        </div>
            <img src="images/logo.png" className='App-logo' alt="Rotating sunshine icon"/>
          </header>
    )
};

export default Header
