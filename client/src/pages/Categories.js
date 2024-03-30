import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Layout from './../components/layout/Layout';
import useCategory from './../hooks/useCategory';

const Categories = () => {
    const categories = useCategory()
    return (
        <Layout>
            <div className='container'>
                <div className='row'>
                    {categories.map(c => (
                        <div className='col-md-6 mt-5 mb-3 gx-2 gy-2' key={c._id}>
                            <Link to={`/category/${c.slug}`} className='btn btn-warning'>{c.name}</Link>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default Categories