import React, { useContext } from 'react'
import { AuthContext } from '../providers/AuthProvider'
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {

    const { user, loading, authenticated } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <div className="flex items-center justify-center">
            <button className="btn">
                <span className="loading loading-spinner text-success"></span>
                Loading ...
            </button>
        </div>
    }

    if (user || authenticated) {
        return children;
    }

    return <Navigate to={"/login"} state={{ from: location }} replace ></Navigate>
}

export default PrivateRoute;