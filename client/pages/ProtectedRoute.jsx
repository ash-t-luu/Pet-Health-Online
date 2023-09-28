import { Route, Navigate, Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import CheckAuthenticated from '../components/Auth.jsx';

const ProtectedRoute = () => {
    const auth = CheckAuthenticated();

    return auth ? (
        <Navigate to='/dashboard' replace />
    ) : (
        <Route path='register' element={<Register />} />
    );
};

export default ProtectedRoute;
