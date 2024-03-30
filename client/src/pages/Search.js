import React from 'react'
import Layout from './../components/layout/Layout';
import { useSearch } from '../context/search';

const Search = () => {
    const [values, setValues] = useSearch();
    return (
        <Layout>
            <div className='container'>
                <div className='text-center'>
                    <h1>Search Results</h1>
                    <h6>
                        {values?.result.length < 1
                            ? "No cars found"
                            : `${values?.result.length} cars`}
                    </h6>

                    <div className='d-flex flex-container flex-wrap justify-content-grid'>
                        {values?.result.map((p) => (
                            <div className="card " style={{ width: '18rem' }} key={p._id}>
                                <img src={`/api/v1/cars/car-photo/${p._id}`} className="card-img-top" alt={p.name} />
                                <div className="card-body">
                                    <h4 className="card-title">{p.name}</h4>
                                    <h5 className='card-text'>₹ {p.price}</h5>
                                    {/* <h6 className='card-text'>{p.category}</h6> */}
                                    <p className="card-text">{p.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Search