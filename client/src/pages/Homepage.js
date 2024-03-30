import React, { useState, useEffect } from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios'
import { Checkbox, Radio } from 'antd'
import { Prices } from '../components/Prices'
import { FaRegHeart } from 'react-icons/fa'

const Homepage = () => {
  const [cars, setCars] = useState([])
  const [categories, setCategories] = useState([])
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  //get category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get('/api/v1/category/get-category')
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error)

    }
  }
  useEffect(() => {
    getAllCategory();
    getTotal();

  }, [])
  //get all cars
  const getAllCars = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/api/v1/cars/car-list/${page}`)
      setLoading(false)
      setCars(data.products)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  //get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get('/api/v1/cars/car-count')
      setTotal(data?.total)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (page === 1) return
    loadMore()
  }, [page])
  //load more
  const loadMore = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/api/v1/cars/car-list/${page}`)
      setLoading(false)
      setCars([...cars, ...data?.products])
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  //filter by category
  const handleFilter = (value, id) => {
    let all = [...checked]
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id)
    }
    setChecked(all);
  }

  useEffect(() => {
    if (!checked.length || !radio.length) getAllCars();

  }, [checked.length, radio.length])

  useEffect(() => {
    if (checked.length || radio.length) filterCar();

  }, [checked, radio])

  //get filtered cars
  const filterCar = async () => {
    try {
      const { data } = await axios.post("/api/v1/cars/cars-filter", { checked, radio })
      setCars(data?.products)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout>
      <div className='row'>
        <div className='col-md-2 mt-3'>
          <h4 className='text-center'>Filter By Category</h4>
          <div className='d-flex flex-column ms-2'>
            {categories?.map((c) => (
              <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/*Price filter*/}
          <h4 className='text-center mt-3'>Filter By Price</h4>
          <div className='d-flex flex-column ms-2'>
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className='d-flex me-2 justify-content-end mt-2'>
            <button className="btn btn-outline-secondary btn-sm" onClick={() => window.location.reload()}>Reset</button>
          </div>

        </div>
        <div className='col-md-10 mt-3'>
          <h1 className='text-center'>All Cars</h1>
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
                  <button className='btn' id='wishlist-btn'><FaRegHeart className='wishlist-icon' /></button>
                  <h4 className="card-title">{p.name}</h4>
                  <h5 className='card-text'>₹ {p.price}</h5>
                  {/* <h6 className='card-text'>{p.category}</h6> */}
                  <p className="card-text">{p.description}</p>
                </div>
              </div>
              // </Link>
            ))}
          </div>
          <div className='m-2 p-3'>
            {cars && cars.length < total && (
              <button className='btn btn-warning' onClick={(e) => {
                e.preventDefault()
                setPage(page + 1)
              }}>
                {loading ? "Loading ..." : "Load more"}
              </button>
            )}
          </div>
        </div>

      </div>
    </Layout>
  )
}

export default Homepage