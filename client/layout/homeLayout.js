import React from 'react';
import { Link, Outlet, Navigate, Redirect } from 'react-router-dom';
import Login from '../pages/Login.jsx';
import CheckAuthenticated from '../components/Auth.jsx';

const HomeLayout = () => {
    // const isAuthenticated = CheckAuthenticated();

    return (
        <div className="home-layout">
            <h1 id='home-h1'>Pet Health Online</h1>
            {/* {isAuthenticated ?
                <Navigate to='/dashboard' replace={true} />
                // <Outlet />
                : (
                    <div id='login-form-container'>
                        <Login />
                    </div>
                )} */}
            <div id='login-form-container'>
                <Login />
            </div>

            {/* <div id='register-redirect'>
                <Link to='/register'>New User? Register Here</Link>
            </div> */}

            <main>
                <Outlet />
            </main>
        </div>
    )
};

export default HomeLayout;