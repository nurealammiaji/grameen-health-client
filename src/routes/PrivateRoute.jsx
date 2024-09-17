import React, { useContext } from 'react'
import { AuthContext } from '../providers/AuthProvider'
import { Navigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

const PrivateRoute = ({ children }) => {

    const { user, loading, authenticated } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <>
            <br /><br />
            <div className="flex items-center justify-center mx-auto my-auto">
                <button className="btn">
                    <span className="loading loading-spinner text-success"></span>
                    Loading ...
                </button>
            </div>
        </>
    }

    if (user || authenticated) {
        return children;
    } else {
        Swal.fire({
            position: "center",
            icon: "warning",
            title: "Please Login or Register !!",
            showConfirmButton: false,
            timer: 1500
        });
    }

    return <Navigate to={"/login"} state={{ from: location }} replace ></Navigate>
}

export default PrivateRoute;