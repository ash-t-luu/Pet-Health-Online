import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const RecordsLayout = () => {
    return (
        <div className="records-layout">
            <h1>View Your Pet's Health Records</h1>

            <main>
                <Outlet />
            </main>
        </div>
    )
};

export default RecordsLayout;