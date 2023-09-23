import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <>
            <h1>Page Not Found</h1>
            <p>Go to the <Link to='/'>Homepage</Link>.</p>
        </>
    )
};

export default NotFound;