import React from 'react'
import '../../App.css'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div className='bg-dark text-light p-3' id='footer'>
        <h4 className='text-center'>All rights reserved &copy;CAR-X</h4>
        <p className='text-center mt-3'>
          <Link to="/about">
            About
          </Link> |&nbsp;
          <Link to="/policy">
            Privacy Policy
          </Link> |&nbsp;
          <Link to="/contact">
            Contact 
          </Link>

        </p>
    </div>
  )
}

export default Footer