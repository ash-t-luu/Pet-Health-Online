import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Login from '../pages/Login.jsx';

const HomeLayout = () => {
    return (
        <div className="home-layout">
            <h1 id='home-h1'>Pet Health Online</h1>
            <div id='login-form-container'>
                <Login />
                <Link to='/register'>New User? Register Here</Link>
            </div>
            <main>
                <Outlet />
            </main>
        </div>
    )
};

export default HomeLayout;