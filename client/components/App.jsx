import React, { useEffect, useState } from 'react';
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';

import Dashboard from '../pages/Dashboard.jsx';
import Login from '../pages/Login.jsx';
import Pet_Records from '../pages/Pet_Records.jsx';
import Register from '../pages/Register.jsx';
import Pet_Health from '../pages/Pet_Health.jsx';
import Pets from '../pages/Pets.jsx';
import NotFound from '../pages/NotFound.jsx';

import '../scss/App.scss';

//layouts
import RootLayout from '../layout/rootLayout.js';
import RecordsLayout from '../layout/recordsLayout.js';
import HomeLayout from '../layout/homeLayout.js';
import PetContainer from '../containers/PetContainers.jsx';
import RegisterLayout from '../layout/registerLayout.js';

const router = createBrowserRouter(
    createRoutesFromElements(

        <Route path='/'>
            <Route path='/' element={<HomeLayout />}></Route>
            <Route path='register' element={<Register />}></Route>

            <Route path='dashboard' element={<RootLayout />}>
                <Route index element={<Dashboard />} />
                <Route path='pet-records' element={<RecordsLayout />}>
                    <Route path='pet-health' element={<Pet_Health />}></Route>
                </Route>
            </Route >
        </Route >
    )
);

const App = () => {

    return (
        <div>
            <RouterProvider router={router} />
        </div>
    );
};

export default App;
