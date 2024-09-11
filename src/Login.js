import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();




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

export default SignUp;