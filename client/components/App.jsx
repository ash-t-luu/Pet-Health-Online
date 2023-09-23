import React from 'react';
import { createBrowserRouter, BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Dashboard from '../pages/Dashboard.jsx';
import Login from '../pages/Login.jsx';
import Pet_Records from '../pages/Pet_Records.jsx';
import Register from '../pages/Register.jsx';
import Pet_Health from '../pages/Pet_Health.jsx';
import Pets from '../pages/Pets.jsx';

import '../scss/App.scss';

// links - a tags that will link to diff parts of app or useNavigate
// can be accessed from top down bc its like provider store

// pass into createBrowserRoute => use router provider 
// { path: 'whatever path you want', element: <ComponentYouWantRendered /> }

const App = () => {
    return (
        <BrowserRouter>
            <main>
                <Routes>
                    <Route path='/' element={<Dashboard />}></Route>
                    <Route path='/petrecords' element={<Pet_Records />}></Route>
                </Routes>
            </main>
        </BrowserRouter>
    );
};

export default App;