import React, { useState } from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/login', {
                email, password
            }
            );
            if (res.data.success) {
                alert(res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                localStorage.setItem('auth', JSON.stringify(res.data));
                navigate(location.state || "/");
            } else {
                alert(res.data.message)
            }
        } catch (error) {
            console.log(error);
            alert("Something went wrong")
        }
    }
    return (
        <>
            <Layout>
                <div className='login'>
                    <form onSubmit={handleSubmit} className='container'>
                        <h1>Login</h1>

                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Password" required />
                        </div>
                        <div className='form-group d-flex justify-content-center mt-2'>
                            <button type="submit" className="btn btn-primary " >Login</button>
                        </div>
                    </form>
                </div>

            </Layout>
        </>
    )
}

export default Login