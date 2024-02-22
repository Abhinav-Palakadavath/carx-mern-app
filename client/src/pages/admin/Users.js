import React, { useState, useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
const Users = () => {
    return (
        <Layout>
            <div className='container-fluid m-3 p-3 w-auto'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1>Users</h1>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Users