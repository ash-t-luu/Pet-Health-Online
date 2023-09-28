// import React, { useState, useEffect } from 'react';

// const CheckAuthenticated = () => {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);

//     const setAuth = boolean => {
//         setIsAuthenticated(boolean);
//     };

//     useEffect(() => {
//         const fetchAuth = async () => {
//             try {
//                 const res = await fetch('http://localhost:5000/pets/verify', {
//                     method: 'POST',
//                     headers: { token: localStorage.token }
//                 });

//                 const parseRes = await res.json();

//                 console.log('parse', parseRes);

//                 parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
//             } catch (error) {
//                 console.error('checkAuthenticated fetch: ERROR: ', error.message);
//             }
//         }
//         fetchAuth();
//     }, []);
//     return isAuthenticated;
// }

// export default CheckAuthenticated;