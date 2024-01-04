import React from 'react'
import { NavLink } from 'react-router-dom'
const UserMenu = () => {
    return (
        <div className='text-center'>
            <div className="list-group">
                <NavLink to="/dashboard/user" className="text-reset text-decoration-none"><h3>User</h3></NavLink>
                <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action">Profile</NavLink>
            </div>
        </div>
    )
}

export default UserMenu