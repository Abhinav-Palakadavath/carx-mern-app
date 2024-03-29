import React, { useState, useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Select } from 'antd'
const { Option } = Select

const CreateCars = () => {
    const navigate = useNavigate()
    const [categories, setCategories] = useState([])
    const [photo, setPhoto] = useState("")
    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")

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

    //create car function
    const handleCreate = async (e) => {
        e.preventDefault()
        try {
            const carData = new FormData()
            carData.append("category", category)
            carData.append("photo", photo)
            carData.append("name", name)
            carData.append("description", description)
            carData.append("price", price)
            const { data } = await axios.post('/api/v1/cars/create-cars', carData)
            // if (data?.success) {
            //     alert("Created successfully")
            //     navigate('/dashboard/admin/cars')
            // } else {
            //     alert("Not created")
            // }
            if (data?.success) {
                alert(data?.message);
                navigate('/dashboard/admin/cars')
            } else {
                alert("Created Successfully");
                // navigate("/dashboard/admin/cars");
            }
        } catch (error) {
            console.log(error)
            alert("Something wrong in creating cars")
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
                        <h1>Create Cars</h1>
                        <div className='m-1 w-75'>
                            <Select variant={false}
                                placeholder="Select a category" size='large' showSearch
                                className='form-select mb-3' onChange={(value) => { setCategory(value) }}>
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
                                {photo && (
                                    <div className='text-center'>
                                        <img
                                            src={URL.createObjectURL(photo)}
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
                                <button className='btn btn-primary' onClick={handleCreate}>Create Car</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateCars