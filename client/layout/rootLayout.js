import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const RootLayout = () => {
    // const navigate = useNavigate();

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
    }

    return (
        <div className="root-layout">
            <header>
                <nav className='nav-bar'>
                    <h1>Pet Health Online</h1>
                    <NavLink to='/dashboard'>Dashboard</NavLink>
                    <NavLink to="/pet-records">Pet Records</NavLink>
                    <button className='logout-btn' onClick={e => logout(e)}>Logout</button>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>
        </div>
    )
};

export default RootLayout;