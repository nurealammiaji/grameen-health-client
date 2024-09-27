import React, { useContext } from 'react'
import { AuthContext } from '../providers/AuthProvider'
import { Navigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';

const PrivateRoute = ({ children }) => {

    const { user, loading, authenticated } = useContext(AuthContext);
    const { t } = useTranslation();
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
            title: `${t('pleaseLogin')} !!`,
            showConfirmButton: false,
            timer: 1500
        });
    }

    return <Navigate to={"/login"} state={{ from: location }} replace ></Navigate>
}

export default PrivateRoute;