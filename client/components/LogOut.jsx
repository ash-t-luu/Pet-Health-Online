import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOutAction } from '../actions/actions';

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch('/pets/logout', {
                method: 'POST', // or 'GET' depending on your server logic
                headers: {
                    'Content-Type': 'application/json',
                },
                // You may need to send additional data depending on your server logic
            });

            if (response.ok) {
                // Clear any client-side state (e.g., Redux store)
                dispatch(logOutAction());

                // Redirect to the login page or any other desired page
                navigate('/');
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Logout fetch /logout: ERROR: ', error);
        }
    };

    return (
        <div>
            <button onClick={handleLogout} className='logout-btn'>Logout</button>
        </div>
    );
};

export default Logout;
