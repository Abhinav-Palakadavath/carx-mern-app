import React from 'react'
import { NavLink, Link } from "react-router-dom"
import "../../App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { FaCar } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { useAuth } from '../../context/auth';

const Header = () => {
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({
      ...auth, user: null,
      token: "",

    })
    localStorage.removeItem('auth');
    alert("Logout Successfully");
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon">
            </span></button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <div className='headerlogo'>
              <Link to='/' className="navbar-brand" ><FaCar /> CAR<span className='ex'>X</span></Link>
            </div>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link" >Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/category" className="nav-link" >Category</NavLink>
              </li>
              {/* <li className="nav-item">
                <NavLink to="/about"  className="nav-link">About</NavLink>
              </li> */}
              {
                !auth.user ? (<>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link ">Register</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link ">Login</NavLink>
                  </li>
                </>) : (<>
                  <li className="nav-item dropdown">
                    <NavLink className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`}
                          className="dropdown-item" >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink onClick={handleLogout} to="/login" className="dropdown-item">Logout</NavLink>
                      </li>
                    </ul>
                  </li>
                </>)
              }
              <li className="nav-item">
                <NavLink to="/wishlist " className="nav-link "><FaRegHeart />(0)</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    </>
  )
}
export default Header