import React from 'react';
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
import PetDashboardLayout from '../layout/petDBLayout.js';
// links - a tags that will link to diff parts of app or useNavigate
// can be accessed from top down bc its like provider store

// pass into createBrowserRoute => use router provider 
// { path: 'whatever path you want', element: <ComponentYouWantRendered /> }

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<RootLayout />}>
            {/* <Route path='/' element={<Dashboard />}>
                <Route path='/' element={<Pets />}></Route>
            </Route> */}
            <Route path='/' element={<PetDashboardLayout />}>
                {/* <Route path='/' element={<Dashboard />}></Route> */}
                <Route path='/' element={<Pets />}></Route>

            </Route>
            <Route path='pet-records' element={<RecordsLayout />}>
                <Route path='pet-health' element={<Pet_Health />}></Route>
            </Route>

            <Route path='*' element={<NotFound />}></Route>
        </Route>
    )
);

const App = () => {
    return (
        <RouterProvider router={router} />

    );
};

export default App;