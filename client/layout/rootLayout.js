import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const RootLayout = () => {
    return (
        <div className="root-layout">
            <header>
                <nav>
                    <h1>Homepage</h1>
                    <NavLink to="/">Dashboard</NavLink>
                    <NavLink to="pet-records">Pet Records</NavLink>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>
        </div>
    )
};

export default RootLayout;