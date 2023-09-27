import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const RecordsLayout = () => {
    return (
        <div className="records-layout">
            <h1>View Your Pet's Health Records</h1>
            <p>Choose from the drop down menu to display your pet's health records</p>
            <NavLink to="pet-health">Choose Your Pet</NavLink>

            <main>
                <Outlet />
            </main>
        </div>
    )
};

export default RecordsLayout;