import React from 'react'
import useUser from '../hooks/useUser';
import Swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';

const MerchantRoute = ({ children }) => {

    const [isUserLoading, userData, refetchUser] = useUser();

    if (isUserLoading) {
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

    if (userData?.role === "merchant") {
        return children;
    } else {
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Access Denied !!",
            text: `Sorry! ${userData?.name}, you are not a Merchant`,
            showConfirmButton: false,
            timer: 1500
        });
    }

    return <Navigate to={"/"} replace={true}></Navigate>
}

export default MerchantRoute;