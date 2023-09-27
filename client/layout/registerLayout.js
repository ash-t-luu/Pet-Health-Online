import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Register from '../pages/Register.jsx'

const RegisterLayout = () => {
    return (
        <div className="register-layout">
            <h1>Registeration</h1>
            <div id='register-container'>
                <Link to='/'>Go to Homepage</Link>
            </div>
            <main>
                <Outlet />
            </main>
        </div>
    )
};

export default RegisterLayout;