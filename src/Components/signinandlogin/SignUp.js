import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./log&sin.css"

const SignUp = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();





    const handleSignUp = async (e) => {
        e.preventDefault();


        try {
            const response = await fetch('http://localhost:5000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, name }),
            });

            const data = await response.json();

            if (response.ok) {
                navigate('/login');

            } else {
                setError(data.error);
            }
        } catch (err) {
            setError('An error occurred');
        }
    };

    return (
        <div className='containerStyle'>
            <h2>Sign Up</h2>
            <br></br>
            <br></br>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSignUp}>
                <label className='labelStyle'>
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className='inputStyle'
                    />
                </label>
                <br />



                <label className='labelStyle'>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className='inputStyle'
                    />
                </label>
                <br />
                <label className='labelStyle'>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className='inputStyle'
                    />
                </label>
                <br />
                <br></br>
                
                <button type="submit" className='buttonStyle'>
                    Sign Up
                </button>
            </form>
        </div>
    );
};



export default SignUp;
