import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import AdminMenu from '../../components/layout/AdminMenu'
import Layout from './../../components/layout/Layout';
import axios from 'axios';

const Cars = () => {
    const [cars, setCars] = useState([])

    //get all cars
    const getAllCars = async () => {
        try {
            const { data } = await axios.get("/api/v1/cars/all-cars");
            setCars(data.products)
        } catch (error) {
            console.log(error);
            alert("Something went wrong")
        }
    }
    //
    useEffect(() => {
        getAllCars();
    }, []);
    return (
        <Layout>
            <div className='container-fluid m-3 p-3 w-auto '>
                <div className='row dashboard'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9 '>
                        <h1 className='text-center'>All Cars</h1>
                        <div className='d-flex flex-container flex-wrap justify-content-grid' id='cars-cards'>
                            {cars?.map((p) => (
                                <Link
                                    key={p._id}
                                    to={`/dashboard/admin/cars/${p.slug}`}
                                    className='car-link'
                                >
                                    <div className="card " style={{ width: '18rem' }} key={p._id}>
                                        <img src={`/api/v1/cars/car-photo/${p._id}`} className="card-img-top" alt={p.name} />
                                        <div className="card-body">
                                            <h5 className="card-title">{p.name}</h5>
                                            <h6 className='card-text'>₹ {p.price}</h6>
                                            <p className="card-text">{p.description}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default Cars