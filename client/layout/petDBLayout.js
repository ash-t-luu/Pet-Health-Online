import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const PetDashboardLayout = () => {
    return (
        <div className="petdb-layout">
            <h1>View Your Pets Here</h1>
            <main>
                <Outlet />
            </main>
        </div>
    )
};

export default PetDashboardLayout;