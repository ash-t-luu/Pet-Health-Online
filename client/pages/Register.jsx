import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Register = () => {

    // Define state variables to store the username and password
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
        name: '',
    });

    const { email, password, name } = inputs;

    const navigate = useNavigate();
    // Handle input change and update the state
    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const body = { email, password, name };

            const response = await fetch('/pets/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            const parseRes = await response.json();

            localStorage.setItem('token', parseRes.token);

            if (response.ok) {
                navigate('/'); // Assuming you're using React Router
            } else {
                console.error('Registration failed');
            }
        } catch (error) {
            console.error('Login fetch /login: ERROR: ', error);
        }
    };

    return (
        <>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input type='email' name='email' placeholder='email' value={email} onChange={e => onChange(e)} />
                < input type='password' name='password' placeholder='password' value={password} onChange={e => onChange(e)} />
                <input type='text' name='name' placeholder='name' value={name} onChange={e => onChange(e)} />
                <button>Submit</button>
            </form>
        </>
    )
};

export default Register;