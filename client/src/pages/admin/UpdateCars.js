import React, { useState, useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Select } from 'antd'
const { Option } = Select

const UpdateCars = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [categories, setCategories] = useState([])
    const [photo, setPhoto] = useState("")
    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [id, setId] = useState("")

    //get single product
    const getSingleCar = async () => {
        try {
            const { data } = await axios.get(`/api/v1/cars/single-car/${params.slug}`)
            setName(data.products.name)
            setId(data.products._id)
            setCategory(data.products.category._id)
            setDescription(data.products.description)
            setPrice(data.products.price)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getSingleCar();
        //eslint-disable-next-line
    }, [])

    //get all categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/get-category')
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error)
            alert("something went wrong in getting category")
        }
    }
    useEffect(() => {
        getAllCategory();
    }, []);

    //update car function
    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const carData = new FormData()
            carData.append("category", category)
            photo && carData.append("photo", photo)
            carData.append("name", name)
            carData.append("description", description)
            carData.append("price", price)
            const { data } = await axios.put(`/api/v1/cars/update-cars/${id}`, carData)
            // if (data?.success) {
            //     alert("Updated successfully")

            // } else {
            //     alert("Not created")
            // }
            if (data?.success) {
                alert(data?.message)
                navigate("/dashboard/admin/cars")
            }
            else {
                alert("Updated succesfully")

            }
        } catch (error) {
            console.log(error)
            alert("Something wrong in updating cars")
        }
    }

    //delete car
    const handleDelete = async () => {
        try {
            let check = window.prompt("Are you sure to delete this product?..")
            if (!check) return
            const { data } = await axios.delete(`/api/v1/cars/delete-car/${id}`)
            alert("Deleted successfully")
            navigate('/dashboard/admin/cars')
        } catch (error) {
            console.log(error)
            alert("Error in deleting")
        }
    }
    return (
        <Layout>
            <div className='container-fluid m-3 p-3 w-auto'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9 border-start '>
                        <h1>Update Cars</h1>
                        <div className='m-1 w-75'>
                            <Select variant={false}
                                placeholder="Select a category" size='large' showSearch
                                className='form-select mb-3' onChange={(value) => { setCategory(value) }}
                                value={category}
                            >
                                {categories?.map(c => (
                                    <Option key={c._id} value={c._id}>
                                        {c.name}
                                    </Option>
                                ))}
                            </Select>
                            <div className="mb-3">
                                <label className="btn btn-outline-secondary col-md-12">
                                    {photo ? photo.name : "Upload Photo"}
                                    <input
                                        type="file"
                                        name="photo"
                                        accept="image/*"
                                        onChange={(e) => setPhoto(e.target.files[0])}
                                        hidden
                                    />
                                </label>
                            </div>
                            <div className='mb-3'>
                                {photo ? (
                                    <div className='text-center'>
                                        <img
                                            src={URL.createObjectURL(photo)}
                                            alt='car'
                                            height={"200px"}
                                            className='img img-responsive'
                                        />
                                    </div>
                                ) : (
                                    <div className='text-center'>
                                        <img
                                            src={`/api/v1/cars/car-photo/${id}`}
                                            alt='car'
                                            height={"200px"}
                                            className='img img-responsive'
                                        />
                                    </div>
                                )}
                            </div>
                            <div className='mb-3'>
                                <input type='text' value={name}
                                    placeholder='Enter car name' className='form-control'
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className='mb-3'>
                                <input type='text' value={description}
                                    placeholder='Desciption' className='form-control'
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className='mb-3'>
                                <input type='text' value={price}
                                    placeholder='Price' className='form-control'
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div className='mb-3'>
                                <button className='btn btn-success' onClick={handleUpdate}>Update Car</button>
                            </div>
                            <div className='mb-3'>
                                <button className='btn btn-danger' onClick={handleDelete}>Delete Car</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UpdateCars