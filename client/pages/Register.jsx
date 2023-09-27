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
        <div class="container">
            <div class="cover">
                <div class="front">
                    <img src="/public/images/cat-with-human.png" alt="human carrying cat with love" />
                    <div class="text">
                        <span class="text-1">We're here for your  <br /> furry family members</span>
                        <span class="text-2">Let's get connected.</span>
                    </div>
                </div>
            </div>

            <div className='forms'>
                <div className='form-content'>
                    <div className='signup-form'>
                        <div className='register-title'>Register</div>
                        <form onSubmit={handleSubmit}>
                            <div className="input-box">
                                <input type='email' name='email' placeholder='Enter your email' value={email} onChange={e => onChange(e)} />
                            </div>
                            <div className="input-box">
                                < input type='password' name='password' placeholder='Enter your password' value={password} onChange={e => onChange(e)} />
                            </div>
                            <div className="input-box">
                                <input type='text' name='name' placeholder='Enter your name' value={name} onChange={e => onChange(e)} />
                            </div>

                            <div className='button input-box'>
                                <button className='registerBtn'>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Register;