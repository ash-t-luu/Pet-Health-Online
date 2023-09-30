import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { fetchPetDataCreator } from '../actions/actions.js';

import '../scss/App.scss';

const Login = () => {
    // Define state variables to store the email and password
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // const [errorMsg, setErrorMsg] = useState({});

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Handle input change and update the state
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // const errors = {
    //     uname: 'Invalid password or username',
    // };

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

            if (response.ok) {
                const responseData = await response.json();
                console.log('response in login fe: ', responseData);

                dispatch(fetchPetDataCreator(responseData));
                navigate('/dashboard');
            } else {
                // setErrorMsg({ name: 'uname',message: errors.uname });
                alert('Invalid password or email');
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Login fetch /login: ERROR: ', error);
        }
    };

    // const renderErrorMsg = (name) => {
    //     name === errorMsg.name && (
    //         <div className='error'>{errorMsg.message}</div>
    //     )
    // }

    return (
        <div className='wrapper'>
            <div className='title'>Login</div>
            <form onSubmit={handleSubmit}>
                <div className='field'>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder='Email:'
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className='field'>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder='Password:'
                        value={formData.password}
                        onChange={handleInputChange}
                        required
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


// const res = await fetch('/pets');
// const data = await res.json();
// dispatch(fetchPetDataCreator(data));