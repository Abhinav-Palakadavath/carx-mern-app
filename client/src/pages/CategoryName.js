import React, { useState, useEffect } from 'react'
import Layout from './../components/layout/Layout';
import { useParams } from 'react-router-dom';
import { FaRegHeart } from 'react-icons/fa'
import axios from 'axios';

const CategoryName = () => {
    const params = useParams()
    const [cars, setCars] = useState([])
    const [category, setCategory] = useState([])

    useEffect(() => {
        if (params?.slug) getCarByCategory()
    }, [params?.slug])
    const getCarByCategory = async () => {
        try {
            const { data } = await axios.get(`/api/v1/cars/car-category/${params.slug}`)
            setCars(data?.products)
            setCategory(data?.category)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Layout>
            <div className='container'>
                <h1 className='text-center mt-3'>{category?.name}</h1>
                <h4 className='text-center mt-3'>{cars?.length} cars</h4>
                <div className='row'>
                    <div className='col-md-10 mt-2 mb-2 '>
                        {/* <h3 className='text-center'> Cars</h3> */}
                        <div className='d-flex flex-container flex-wrap justify-content-grid'>
                            {/* <h1>Cars</h1> */}
                            {cars?.map((p) => (
                                // <Link
                                //   key={p._id}
                                //   to={`/dashboard/admin/cars/${p.slug}`}
                                //   className='car-link'
                                // >
                                <div className="card " style={{ width: '18rem' }} key={p._id}>
                                    <img src={`/api/v1/cars/car-photo/${p._id}`} className="card-img-top" alt={p.name} />
                                    <div className="card-body">
                                        <button className='btn btn-lg' id='wishlist-btn'><FaRegHeart className='wishlist-icon' /></button>
                                        <h4 className="card-title">{p.name}</h4>
                                        <h5 className='card-text'>₹ {p.price}</h5>
                                        {/* <h6 className='card-text'>{p.category}</h6> */}
                                        <p className="card-text">{p.description}</p>
                                    </div>
                                </div>
                                // </Link>
                            ))}
                        </div>
                        {/* <div className='m-2 p-3'>
            {cars && cars.length < total && (
              <button className='btn btn-warning' onClick={(e) => {
                e.preventDefault()
                setPage(page + 1)
              }}>
                {loading ? "Loading ..." : "Load more"}
              </button>
            )}
          </div> */}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CategoryName