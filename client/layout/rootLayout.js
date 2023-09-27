import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const RootLayout = () => {

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
    }

    return (
        <div className="root-layout">
            <header>
                <nav>
                    <h1>Homepage</h1>
                    <NavLink index>Dashboard</NavLink>
                    <NavLink to="pet-records">Pet Records</NavLink>
                    <button className='btn btn-logout' onClick={e => logout(e)}>Logout</button>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>
        </div>
    )
};

export default RootLayout;