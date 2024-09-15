import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
                navigate('/topics');

            } else {
                setError(data.error);
            }
        } catch (err) {
            setError('An error occurred');
        }
    };

    return (
        <div style={containerStyle}>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <label style={labelStyle}>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={inputStyle}
                    />
                </label>
                <br />
                <label style={labelStyle}>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={inputStyle}
                    />
                </label>
                <br />
                <button type="submit" style={buttonStyle}>
                    Login
                </button>
            </form>
        </div>
    );
};

const containerStyle = {
    margin: '0 auto',
    padding: '20px',
    maxWidth: '400px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#ffffff',
};

const labelStyle = {
    display: 'block',
    marginBottom: '10px',
    fontSize: '16px',
};

const inputStyle = {
    width: '100%',
    padding: '8px',
    marginTop: '5px',
    borderRadius: '4px',
    border: '1px solid #ddd',
};

const buttonStyle = {
    marginTop: '20px',
    fontSize: '16px',
    backgroundColor: '#2c94cc',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    padding: '10px 20px',
    cursor: 'pointer',
};

export default Login;
