import React, { useContext } from 'react'
import { AuthContext } from '../providers/AuthProvider'
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {

    const { loading, user } = useContext(AuthContext);

    const location = useLocation();

    if (loading) {
        return <div>Loading .....</div>
    }

    if (user) {
        return children;
    }

    <Navigate state={{from: location}} replace={true} />
}

export default PrivateRoute;