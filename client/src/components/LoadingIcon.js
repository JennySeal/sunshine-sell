import React from 'react';
import './../styles/header.css';
import Spinner from 'react-bootstrap/Spinner'

const LoadingIcon = () => {
    return (
        <div id="LoadingIcon">
        <h4>We are spinning up! Sorry you are waiting</h4>        
  <Spinner animation="grow" variant="danger" />&nbsp;&nbsp;
  <Spinner animation="border" variant="light" />&nbsp;&nbsp;
  <Spinner animation="grow" variant="dark" />
        </div> 
    )
}

export default LoadingIcon
