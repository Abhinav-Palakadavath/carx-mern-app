import React from 'react'
import Layout from '../components/layout/Layout'
import { useWishlist } from '../context/wishlist'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom';

const WishListPage = () => {
    const [auth, setAuth] = useAuth()
    const [wishlist, setWishlist] = useWishlist()
    const navigate = useNavigate()
    return (
        <Layout>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <h1 className='text-center bg-light p-2 mb-1'>
                            {`Hello ${auth?.token && auth?.user?.name}`}
                        </h1>
                        <h4 className='text-center '>
                            {wishlist?.length
                                ? `You have ${wishlist.length} in list ${auth?.token ? "" : "Please login"
                                }`
                                : "Your list is empty"}
                        </h4>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default WishListPage