import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
    return (
        <>
            <div className='text-center'>
                <div className="list-group">
                    <NavLink to="/dashboard/admin" className="text-reset text-decoration-none"><h3>Admin Panel</h3></NavLink>
                    <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action list-group-item-light">
                        Create Category
                    </NavLink>
                    <NavLink to="/dashboard/admin/create-cars" className="list-group-item list-group-item-action list-group-item-light">
                        Create Cars
                    </NavLink>
                    <NavLink to="/dashboard/admin/cars" className="list-group-item list-group-item-action list-group-item-light">
                        Cars
                    </NavLink>
                    <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action list-group-item-light">
                        Users
                    </NavLink>
                </div>
            </div>
        </>
    )
}

export default AdminMenu