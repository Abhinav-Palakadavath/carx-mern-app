import React from 'react'
import Header from './Header';
import Footer from './Footer'
import '../../App.css'
const Layout = ({children}) => {
  return (
    <div>
      <span id='header'><Header/></span>
      <main id='main'>{children}</main>
      <span id='footer'><Footer/> </span>  
    </div>
  )
}

export default Layout