import React, { useState, useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import axios from 'axios'
import CategoryForm from '../../components/form/CategoryForm'
import { Modal } from 'antd'

const CreateCategory = () => {
    const [categories, setCategories] = useState([])
    const [inputValue, setInputValue] = useState("");
    const [visible, setVisible] = useState(false)
    const [selected, setSelected] = useState(null)
    const [updatedName, setUpdatedName] = useState("")
    //handle form
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post("/api/v1/category/create-category", { name: inputValue })
            if (data.success) {
                alert(`${inputValue} is created`)
                getAllCategory();
                setInputValue("");
            } else {
                alert(data.message)
            }
        } catch (error) {
            console.log(error);
            alert("Something went wrong on input")
        }
    }
    //get all categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/get-category')
            if (data.success) {
                setCategories(data.category);
            }
        } catch (error) {
            console.log(error)
            alert("something went wrong in getting category")
        }
    }
    useEffect(() => {
        getAllCategory();

    }, []);

    //update category
    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.put(`/api/v1/category/update-category/${selected._id}`, { name: updatedName })
            if (data.success) {
                alert(`${updatedName} is updated`)
                setSelected(null)
                setUpdatedName("")
                setVisible(false)
                getAllCategory();
            } else {
                alert(data.message)
            }
        } catch (error) {
            alert("Something went wrong!!!")
        }
    }
    //delete category
    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`/api/v1/category/delete-category/${id}`)
            if (data.success) {
                alert(`Category is deleted`)
                getAllCategory();
            } else {
                alert(data.message)
            }
        } catch (error) {
            alert("Something went wrong!!!")
        }
    }
    return (
        <Layout>
            <div className='container-fluid m-3 p-3 w-auto'>
                <div className='row'>
                    <div className='col-md-3 '>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9 border-start '>
                        <h1>Manage Category</h1>
                        <div>
                            <div className='p-3 w-50'>
                                <CategoryForm
                                    handleSubmit={handleSubmit}
                                    value={inputValue}  // Change this to inputValue
                                    setValue={setInputValue}  // Change this to setInputValue
                                />
                            </div>
                            <table className="table w-50">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories?.map(c => (
                                        <>
                                            <tr>
                                                <td key={c._id}>{c.name}</td>
                                                <td>
                                                    <button className='btn btn-success btn-sm ms-2'
                                                        onClick={() => {
                                                            setVisible(true);
                                                            setUpdatedName(c.name);
                                                            setSelected(c)
                                                        }}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button className='btn btn-danger btn-sm ms-2'
                                                        onClick={() => {
                                                            handleDelete(c._id)
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        </>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Modal onCancel={() => setVisible(false)} footer={null} open={visible}>
                            <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
                        </Modal>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateCategory