import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Register from './Register.jsx';

import '../scss/App.scss';

const Login = () => {
    // Define state variables to store the email and password
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    // Handle input change and update the state
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('/pets/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            console.log('response: ', response);

            if (response.ok) {
                // Authentication was successful
                // You can redirect the user to the dashboard or perform any other actions
                navigate('/dashboard');
                // history.push('/dashboard'); // Assuming you're using React Router
            } else {
                // Handle authentication failure, e.g., show an error message
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Login fetch /login: ERROR: ', error);
        }
    };

    return (
        <div className='wrapper'>
            <div className='title'>Login</div>
            <form onSubmit={handleSubmit}>
                <div className='field'>
                    {/* <label htmlFor="email">Email:</label> */}
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder='Email:'
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='field'>
                    {/* <label htmlFor="password">Password:</label> */}
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder='Password:'
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="field">
                    <button type="submit" className='login-btn' >Login</button>
                </div>
                <div className='link-to-p'>
                    <p>New User? <Link to='/register'>Register Here</Link></p>
                </div>
            </form>
        </div>
    );
};

export default Login;
