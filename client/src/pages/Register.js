import React, { useState } from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/register', {
                name, email, password
            }
            );
            if (res.data.success) {
                alert(res.data.message);
                navigate("/login");
            } else {
                alert(res.data.message)
            }
        } catch (error) {
            console.log(error);
            alert("Something went wrong")
        }
    }
    return (
        <Layout>
            <div className='register'>
                <form onSubmit={handleSubmit} className='container'>
                    <h1>Register</h1>
                    <div className="form-group">
                        <label htmlFor="exampleInputName">Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control " id="exampleName" aria-describedby="NameHelp" placeholder="Enter name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Password" required />
                    </div>
                    <div className='form-group d-flex justify-content-center mt-2'>
                        <button type="submit" className="btn btn-primary" >Register</button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default Register