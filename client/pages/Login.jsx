import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        <div id='login-form'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
