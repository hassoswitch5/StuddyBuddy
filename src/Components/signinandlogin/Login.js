import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./log&sin.css"

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();


        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                sessionStorage.setItem('name',data['name'])
                navigate('/page');

            } else {
                setError(data.error);
            }
        } catch (err) {
            setError('An error occurred');
        }
    };

    return (
        <div className='containerStyle'>
            <h2>Login</h2>
            <br></br>
            <br></br>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <form onSubmit={handleLogin}>
                <label className='labelStyle'>
                    Email :
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className='inputStyle'
                    />
                </label>
                <br/>
                <label className='labelStyle'>
                    Password :
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className='inputStyle'
                    />
                </label>
                <br/>
                <br></br>

                <button type="submit" className='buttonStyle'>
                    Login
                </button>

            </form>
            <h7>dont have an account</h7>
            <div>
            <a href="/signup" target="_blank" rel="noopener noreferrer" style={{fontSize:"5"}}>
                Click here to Signup
            </a>
            </div>
        </div>
    );
};

export default Login;
